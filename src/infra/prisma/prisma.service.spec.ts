import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

// Union type semua model yang support softDelete (punya field deletedAt)
type SoftDeletableModel = 'product';

// Extract delegate type per model dari PrismaClient
type ModelDelegate<T extends SoftDeletableModel> = PrismaClient[T];

// Pastikan model delegate punya method update dengan where & data
type WithUpdate<T extends SoftDeletableModel> =
  ModelDelegate<T> extends {
    update: (args: { where: unknown; data: unknown }) => Promise<unknown>;
  }
    ? ModelDelegate<T>
    : never;

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  private readonly client: PrismaClient;

  // ── model delegates ──────────────────────────────────────────────────────────
  readonly product: PrismaClient['product'];
  // readonly user:    PrismaClient['user'];
  // readonly order:   PrismaClient['order'];

  constructor() {
    this.client = new PrismaClient({
      log: [
        { level: 'warn', emit: 'stdout' },
        { level: 'error', emit: 'stdout' },
        ...(process.env.NODE_ENV !== 'production'
          ? [{ level: 'query' as const, emit: 'stdout' as const }]
          : []),
      ],
    });

    this.product = this.client.product;
    // this.user    = this.client.user;
    // this.order   = this.client.order;
  }

  async onModuleInit(): Promise<void> {
    await this.client.$connect();
    this.logger.log('✅ Database connected');
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.$disconnect();
    this.logger.log('Database disconnected');
  }

  // ── $transaction proxy ────────────────────────────────────────────────────────
  async $transaction<T>(
    fn: (tx: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    return this.client.$transaction(fn);
  }

  // ── soft delete — fully typed, zero any ──────────────────────────────────────
  async softDelete<T extends SoftDeletableModel>(
    model: T,
    where: Parameters<WithUpdate<T>['update']>[0]['where'],
  ): Promise<void> {
    const delegate = this.client[model] as WithUpdate<T>;
    await delegate.update({
      where,
      data: { deletedAt: new Date() } as Parameters<
        WithUpdate<T>['update']
      >[0]['data'],
    });
  }
}
