import { useEffect, useState, type FormEvent } from "react";
import { createOrder, type CreateOrderPayload } from "../../api/orders";
import { ApiError } from "../../api/client";

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const initialForm: CreateOrderPayload = {
  customerName: "",
  phoneNumber: "",
  productName: "",
  amount: "",
  price: "",
};

export function CreateOrderModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateOrderModalProps) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, submitting]);

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
      setError(null);
      setSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const quantity = Number(form.amount);
  const unitPrice = Number(form.price);
  const total =
    form.amount !== "" &&
    form.price !== "" &&
    !Number.isNaN(quantity) &&
    !Number.isNaN(unitPrice)
      ? quantity * unitPrice
      : null;

  const updateField = (field: keyof CreateOrderPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    if (
      !form.customerName.trim() ||
      !form.phoneNumber.trim() ||
      !form.productName.trim() ||
      form.amount === "" ||
      form.price === ""
    ) {
      setError("All fields are required.");
      setSubmitting(false);
      return;
    }

    if (
      Number.isNaN(quantity) ||
      Number.isNaN(unitPrice) ||
      quantity <= 0 ||
      unitPrice <= 0
    ) {
      setError("Amount and price must be valid positive numbers.");
      setSubmitting(false);
      return;
    }

    try {
      await createOrder({
        customerName: form.customerName.trim(),
        phoneNumber: form.phoneNumber.trim(),
        productName: form.productName.trim(),
        amount: String(quantity),
        price: String(unitPrice),
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Failed to create order. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-order-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={submitting ? undefined : onClose}
        aria-label="Close dialog"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#1a1b22] p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="text-left">
            <h2
              id="create-order-title"
              className="text-xl font-semibold text-gray-50"
            >
              Create Order
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Fill in the details to place a new order.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-white/10 hover:text-gray-200 disabled:opacity-50"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="customerName" className="text-sm text-gray-300">
              Customer name
            </label>
            <input
              id="customerName"
              type="text"
              value={form.customerName}
              onChange={(event) =>
                updateField("customerName", event.target.value)
              }
              className="rounded-lg border border-white/10 bg-[#121318] px-3 py-2.5 text-sm text-gray-100 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
              placeholder="John Doe"
              disabled={submitting}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="phoneNumber" className="text-sm text-gray-300">
              Phone number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={form.phoneNumber}
              onChange={(event) =>
                updateField("phoneNumber", event.target.value)
              }
              className="rounded-lg border border-white/10 bg-[#121318] px-3 py-2.5 text-sm text-gray-100 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
              placeholder="9876543210"
              disabled={submitting}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="productName" className="text-sm text-gray-300">
              Product name
            </label>
            <input
              id="productName"
              type="text"
              value={form.productName}
              onChange={(event) =>
                updateField("productName", event.target.value)
              }
              className="rounded-lg border border-white/10 bg-[#121318] px-3 py-2.5 text-sm text-gray-100 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Wireless Headphones"
              disabled={submitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="amount" className="text-sm text-gray-300">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                min="1"
                step="1"
                value={form.amount}
                onChange={(event) => updateField("amount", event.target.value)}
                className="rounded-lg border border-white/10 bg-[#121318] px-3 py-2.5 text-sm text-gray-100 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="1"
                disabled={submitting}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="price" className="text-sm text-gray-300">
                Price
              </label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                className="rounded-lg border border-white/10 bg-[#121318] px-3 py-2.5 text-sm text-gray-100 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="2999"
                disabled={submitting}
              />
            </div>
          </div>

          {total !== null && (
            <p className="text-sm text-gray-400">
              Order total:{" "}
              <span className="font-medium text-emerald-300">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 2,
                }).format(total)}
              </span>
            </p>
          )}

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
