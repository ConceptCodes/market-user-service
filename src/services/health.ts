import type { IHealthStatus } from "@/constants";
import { checkDatabaseHealth } from "@lib/db";

export default class HealthService {
  private healthReport: IHealthStatus[];

  constructor() {
    this.healthReport = [];
  }

  public async checkIntegrationsHealth(): Promise<IHealthStatus[]> {
    this.healthReport = await Promise.all([this.checkDatabaseHealth()]);
    return this.healthReport;
  }

  public async checkDatabaseHealth(): Promise<IHealthStatus> {
    const connected = await checkDatabaseHealth();
    return { service: "DATABASE", connected };
  }
}
