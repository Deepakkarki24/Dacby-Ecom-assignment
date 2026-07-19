const END_POINTS = {
  ORDER: {
    FETCH: "/api/order/get-orders",
    CREATE: "/api/order/create",
  },
  SCHEDULER: {
    RUN: "/api/scheduler/run",
  },
} as const;

export default END_POINTS;
