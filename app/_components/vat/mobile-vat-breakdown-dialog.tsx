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
import { VATBreakdownCard } from "./vat-breakdown-card";
import type { VATCalculationResult } from "@/lib/vat-calculator";

interface MobileVATBreakdownDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: VATCalculationResult | null;
}

export function MobileVATBreakdownDialog({
  open,
  onOpenChange,
  result,
}: MobileVATBreakdownDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex-1 lg:hidden">Show VAT breakdown</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>VAT Breakdown</DialogTitle>
          <DialogDescription>
            Detailed breakdown of VAT, NHIL, and GETFund calculations
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <VATBreakdownCard result={result} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

