// Format currency with 2 decimal places
export function formatCurrency(value: string): string {
  if (!value || value === "0.00") return "0.00";
  const num = parseFloat(value);
  if (isNaN(num)) return "0.00";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Format amount without decimals
export function formatAmount(value: string): string {
  if (!value || value === "0") return "0";
  const num = parseFloat(value);
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// Format input with commas as user types
export function formatInputValue(value: string): string {
  // Remove all non-digit characters except decimal point
  const cleaned = value.replace(/[^\d.]/g, "");
  
  // Prevent multiple decimal points
  const parts = cleaned.split(".");
  if (parts.length > 2) {
    return parts[0] + "." + parts.slice(1).join("");
  }
  
  // Format integer part with commas
  if (parts[0]) {
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;
  }
  
  return cleaned;
}

// Parse formatted input back to number string
export function parseInputValue(value: string): string {
  return value.replace(/,/g, "");
}

