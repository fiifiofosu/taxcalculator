import { Decimal } from "decimal.js";

// VAT Rates in Ghana
export const VAT_RATE = 15.0; // 15%
export const NHIL_RATE = 2.5; // 2.5%
export const GETFUND_RATE = 2.5; // 2.5%
export const TOTAL_TAX_RATE = 20.0; // Total: 15% + 2.5% + 2.5% = 20%

export interface VATCalculationResult {
  taxableValue: string;
  nhil: string;
  getfund: string;
  vat: string;
  finalCost: string;
  mode: "exclusive" | "inclusive";
}

export interface VATCalculationError {
  errorMessage: string;
}

export type VATCalculationResponse = VATCalculationResult | VATCalculationError;

function isValidNumber(val: string | number): boolean {
  if (val === "" || val === null || val === undefined) return false;
  const numStr = typeof val === "number" ? val.toString() : val;
  const positiveNumberRegex = /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/;
  return positiveNumberRegex.test(numStr);
}

// Calculate VAT in Exclusive mode (taxable amount is input)
export function calculateVATExclusive(taxableInput: string | number): VATCalculationResponse {
  let taxable = taxableInput;

  if (taxable === "") {
    taxable = 0;
  }

  if (!isValidNumber(taxable)) {
    return { errorMessage: "Please input a valid taxable amount" };
  }

  const taxableValue = new Decimal(taxable);
  const nhil = taxableValue.times(NHIL_RATE).dividedBy(100);
  const getfund = taxableValue.times(GETFUND_RATE).dividedBy(100);
  const vat = taxableValue.times(VAT_RATE).dividedBy(100);
  const finalCost = taxableValue.plus(nhil).plus(getfund).plus(vat);

  return {
    taxableValue: taxableValue.toFixed(2),
    nhil: nhil.toFixed(2),
    getfund: getfund.toFixed(2),
    vat: vat.toFixed(2),
    finalCost: finalCost.toFixed(2),
    mode: "exclusive",
  };
}

// Calculate VAT in Inclusive mode (final cost is input, derive taxable amount)
export function calculateVATInclusive(finalCostInput: string | number): VATCalculationResponse {
  let finalCost = finalCostInput;

  if (finalCost === "") {
    finalCost = 0;
  }

  if (!isValidNumber(finalCost)) {
    return { errorMessage: "Please input a valid final cost amount" };
  }

  // Derive taxable value: finalCost = taxableValue * 1.20
  // Therefore: taxableValue = finalCost / 1.20
  const finalCostDecimal = new Decimal(finalCost);
  const taxableValue = finalCostDecimal.dividedBy(1.20); // 1 + 0.20 (total tax rate)
  const nhil = taxableValue.times(NHIL_RATE).dividedBy(100);
  const getfund = taxableValue.times(GETFUND_RATE).dividedBy(100);
  const vat = taxableValue.times(VAT_RATE).dividedBy(100);

  return {
    taxableValue: taxableValue.toFixed(2),
    nhil: nhil.toFixed(2),
    getfund: getfund.toFixed(2),
    vat: vat.toFixed(2),
    finalCost: finalCostDecimal.toFixed(2),
    mode: "inclusive",
  };
}

