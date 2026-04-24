export async function getFinopsData() {
  // 🔁 Replace this later with Databricks API
  return {
    kpis: {
      totalCost: 127845,
      subscriptions: 12,
      resourceGroups: 48,
      resources: 1247,
      savings: 18234,
    },
    trend: [
      { name: "P01", value: 22000 },
      { name: "P02", value: 27000 },
      { name: "P03", value: 13000 },
      { name: "P04", value: 33000 },
    ],
  };
}