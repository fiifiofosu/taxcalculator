"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TaxBreakdownCard } from "./tax-breakdown-card";
import type { TaxCalculationResult } from "@/lib/calculator";

interface MobileBreakdownDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: TaxCalculationResult | null;
  ssnitEnabled: boolean;
}

export function MobileBreakdownDialog({
  open,
  onOpenChange,
  result,
  ssnitEnabled,
}: MobileBreakdownDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex-1 lg:hidden">
          Show tax breakdown
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tax Breakdown</DialogTitle>
          <DialogDescription>
            Detailed breakdown of tax brackets and rates
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <TaxBreakdownCard result={result} ssnitEnabled={ssnitEnabled} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

