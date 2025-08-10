import { Router } from "express";

import contributionRoutes from "./contributions.routes";
import periodRoutes from "./period.routes";
import payoutRoutes from "./payout.routes";
import paymentHistoryRoutes from "./payment-history.routes";

const router = Router();

router.use("/contributions", contributionRoutes);
router.use("/contributions/period", periodRoutes);
router.use("/contributions/payout", payoutRoutes);
router.use("/contributions/payment-history", paymentHistoryRoutes);

export default router;
