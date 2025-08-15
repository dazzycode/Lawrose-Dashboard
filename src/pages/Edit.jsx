import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
 import React, { useRef, useState } from "react";
import { SketchPicker } from "react-color";

export default function Edit() {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    productName: "",
    category: "",
    collection: "",
    gender: "",
    description: "",
    currency: "",
    price: "",
    stockQty: "",
    discountAvailability: "",
    sizes: [],
    colors: [
      "#2D4BF2", // blue
      "#000000", // black
      "#FFFFFF", // white
      "#8A5A2B", // brown
      "#95652C", // ochre
      "#197F7D", // teal
      "#F05C2D", // orange
      "#1F5562", // slate teal
    ],
    extraDetails: [],
    imageFile: null,
  });

  const sizeOptions = ["XXL", "XL", "L", "M", "S", "XS"];
  const colorSlots = 20; // total color boxes to display (prefilled + plus boxes)

  // ========= Image Upload =========
  const handleFiles = (files) => {
    if (!files || !files.length) return;
    const file = files[0];
    const okType = /image\/(png|jpeg|jpg|tiff|webp)/i.test(file.type);
    const okSize = file.size <= 10 * 1024 * 1024; // 10MB
    if (!okType || !okSize) {
      alert("Please upload a PNG, TIFF, JPG, or WEBP up to 10MB.");
      return;
    }
    setForm((p) => ({ ...p, imageFile: file }));
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  // ========= Field Helpers =========
  const setField = (name, value) => setForm((p) => ({ ...p, [name]: value }));
  const toggleSize = (size) =>
    setForm((p) => ({
      ...p,
      sizes: p.sizes.includes(size)
        ? p.sizes.filter((s) => s !== size)
        : [...p.sizes, size],
    }));

  // ========= Color Picker Modal =========
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [colorEditingIndex, setColorEditingIndex] = useState(null); // null means append
  const [tempColor, setTempColor] = useState("#000000");

  const openColorModalFor = (index) => {
    setColorEditingIndex(index);
    const existing = form.colors[index];
    setTempColor(existing || "#000000");
    setColorModalOpen(true);
  };

  const savePickedColor = () => {
    setForm((p) => {
      const next = [...p.colors];
      if (colorEditingIndex == null) next.push(tempColor);
      else next[colorEditingIndex] = tempColor;
      return { ...p, colors: next };
    });
    setColorModalOpen(false);
  };

  const clearColorAt = (index) => {
    setForm((p) => ({ ...p, colors: p.colors.filter((_, i) => i !== index) }));
  };

  // ========= Description word-limit helper (50 words like mock) =========
  const wordCount = (form.description || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const maxWords = 50;

  // ========= Submit =========
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare payload for easy API wiring later
    const payload = { ...form, imageFile: undefined };
    console.log("FORM DATA", payload);

    // Example when wiring to real API: use FormData for file upload
    // const fd = new FormData();
    // Object.entries(payload).forEach(([k, v]) => {
    //   fd.append(k, typeof v === "object" ? JSON.stringify(v) : String(v ?? ""));
    // });
    // if (form.imageFile) fd.append("image", form.imageFile);
    // await fetch("/api/products", { method: "POST", body: fd });
  };

  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  
  return (
    <div className="flex min-h-screen bg-white flex-col md:flex-row">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white border-r transform transition-transform duration-300 md:translate-x-0 md:static md:block ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      <div className="flex-1">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
      
    <div className="min-h-screen bg-white text-black">
      {/* Top Bar */}
      <div className="mx-auto max-w-5xl px-5 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-semibold tracking-tight">Add a new Product</h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-9 rounded-md border border-gray-300 px-4 text-sm hover:bg-gray-50"
              onClick={() => console.log("Save as draft", form)}
            >
              Save as draft
            </button>
            <button
              type="button"
              className="h-9 rounded-md border border-gray-300 px-4 text-sm hover:bg-gray-50"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl px-5 pb-16"
      >
        {/* Upload Panel */}
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
          <div
            onDragEnter={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={() => setDragActive(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition ${
              dragActive ? "border-black bg-gray-50" : "border-gray-300 bg-gray-50"
            }`}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-64 w-auto object-contain"
              />
            ) : (
              <>
                {/* Image icon placeholder */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-12 w-12 text-gray-400"
                >
                  <path d="M19.5 3.75h-15A2.25 2.25 0 0 0 2.25 6v12A2.25 2.25 0 0 0 4.5 20.25h15a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 19.5 3.75Zm-10.125 6A1.875 1.875 0 1 1 7.5 7.875 1.875 1.875 0 0 1 9.375 9.75ZM4.5 17.25l4.909-6.135a.75.75 0 0 1 1.205.03l3.11 4.354 2.126-2.462a.75.75 0 0 1 1.169.082l2.481 3.63v.5H4.5Z" />
                </svg>
                <p className="mt-3 text-[15px]">Drag & Drop image</p>
                <p className="text-[15px]">here</p>
                <span className="my-2 text-sm">or</span>
                <span className="rounded-md bg-gray-900 px-3 py-1 text-sm font-medium text-white">Choose file</span>
                <p className="mt-3 text-xs text-gray-500">
                  Supported formats: PNG, TIFF, JPG,
                </p>
                <p className="text-xs text-gray-500">up to 10 MB</p>
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </div>

        {/* Basic Information */}
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-[15px] font-semibold tracking-tight text-gray-900">Basic Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
            <input
              className="col-span-12 md:col-span-4 h-11 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Product name"
              value={form.productName}
              onChange={(e) => setField("productName", e.target.value)}
            />
            <select
              className="col-span-12 md:col-span-3 h-11 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
            >
              <option value="">Categories</option>
              <option value="clothing">Clothing</option>
              <option value="footwear">Footwear</option>
              <option value="accessories">Accessories</option>
            </select>
            <select
              className="col-span-12 md:col-span-3 h-11 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={form.collection}
              onChange={(e) => setField("collection", e.target.value)}
            >
              <option value="">Collection</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="classic">Classic</option>
            </select>
            <select
              className="col-span-12 md:col-span-2 h-11 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={form.gender}
              onChange={(e) => setField("gender", e.target.value)}
            >
              <option value="">Gender</option>
              <option value="unisex">Unisex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="relative mt-4">
            <textarea
              className="h-24 w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
            <span className={`absolute bottom-2 right-3 text-xs ${
              wordCount > maxWords ? "text-red-500" : "text-gray-400"
            }`}>
              Max 50 words
            </span>
          </div>
        </section>

        {/* Pricing & stock */}
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-[15px] font-semibold tracking-tight text-gray-900">Pricing & stock</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
            <select
              className="col-span-12 md:col-span-3 h-11 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={form.currency}
              onChange={(e) => setField("currency", e.target.value)}
            >
              <option value="">Currency</option>
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <input
              type="number"
              className="col-span-12 md:col-span-3 h-11 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setField("price", e.target.value)}
            />
            <input
              type="number"
              className="col-span-12 md:col-span-3 h-11 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Stock Quantity"
              value={form.stockQty}
              onChange={(e) => setField("stockQty", e.target.value)}
            />
            <select
              className="col-span-12 md:col-span-3 h-11 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={form.discountAvailability}
              onChange={(e) => setField("discountAvailability", e.target.value)}
            >
              <option value="">Discount availability</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </section>

        {/* Sizes and colors */}
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-[15px] font-semibold tracking-tight text-gray-900">Sizes and colors</h2>
          <div className="mt-4 grid grid-cols-12 gap-6">
            {/* Sizes: left column */}
            <div className="col-span-12 md:col-span-4">
              <p className="mb-2 text-sm font-semibold text-gray-900">Select all available sizes</p>
              <div className="space-y-3">
                {sizeOptions.map((s) => (
                  <label key={s} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-400"
                      checked={form.sizes.includes(s)}
                      onChange={() => toggleSize(s)}
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            {/* Colors: right column */}
            <div className="col-span-12 md:col-span-8">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">Add all available colours</p>
              </div>

              {/* Color grid */}
              <div className="grid grid-cols-8 gap-3">
                {Array.from({ length: colorSlots }).map((_, i) => {
                  const color = form.colors[i];
                  if (color) {
                    return (
                      <div key={i} className="relative">
                        <button
                          type="button"
                          title={color}
                          className="h-9 w-9 rounded-md border border-gray-300 shadow-sm"
                          style={{ backgroundColor: color }}
                          onClick={() => openColorModalFor(i)}
                        />
                        <button
                          type="button"
                          aria-label="Remove color"
                          className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-white text-[10px] shadow ring-1 ring-gray-300"
                          onClick={() => clearColorAt(i)}
                        >
                          ×
                        </button>
                      </div>
                    );
                  }
                  return (
                    <button
                      key={i}
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-dashed border-gray-300 text-lg text-gray-400 hover:bg-gray-50"
                      onClick={() => openColorModalFor(i)}
                    >
                      +
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Add other product details */}
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-[15px] font-semibold tracking-tight text-gray-900">Add other product details</h2>
          <button
            type="button"
            onClick={() =>
              setForm((p) => ({
                ...p,
                extraDetails: [...p.extraDetails, { key: "", value: "" }],
              }))
            }
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:underline"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300">+</span>
            Add a new product detail
          </button>

          {form.extraDetails.length > 0 && (
            <div className="mt-4 space-y-3">
              {form.extraDetails.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-3">
                  <input
                    className="col-span-12 md:col-span-5 h-10 rounded-md border border-gray-300 px-3 text-sm"
                    placeholder="Label (e.g., Material)"
                    value={row.key}
                    onChange={(e) =>
                      setForm((p) => {
                        const next = [...p.extraDetails];
                        next[idx] = { ...next[idx], key: e.target.value };
                        return { ...p, extraDetails: next };
                      })
                    }
                  />
                  <input
                    className="col-span-12 md:col-span-6 h-10 rounded-md border border-gray-300 px-3 text-sm"
                    placeholder="Value (e.g., 100% Cotton)"
                    value={row.value}
                    onChange={(e) =>
                      setForm((p) => {
                        const next = [...p.extraDetails];
                        next[idx] = { ...next[idx], value: e.target.value };
                        return { ...p, extraDetails: next };
                      })
                    }
                  />
                  <button
                    type="button"
                    className="col-span-12 md:col-span-1 h-10 rounded-md border border-gray-300 text-sm hover:bg-gray-50"
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        extraDetails: p.extraDetails.filter((_, i) => i !== idx),
                      }))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Publish button (centered, fixed width like mock) */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="h-10 w-56 rounded-md bg-black text-sm font-medium text-white hover:opacity-90"
          >
            Publish
          </button>
        </div>
      </form>

      {/* Color Picker Modal */}
      {colorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold">Select a color</h3>
              <button
                onClick={() => setColorModalOpen(false)}
                className="h-7 w-7 rounded-md border border-gray-300 text-sm"
              >
                ×
              </button>
            </div>
            <SketchPicker
              color={tempColor}
              onChange={(c) => setTempColor(c.hex)}
              disableAlpha
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="h-9 rounded-md border border-gray-300 px-4 text-sm"
                onClick={() => setColorModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-9 rounded-md bg-black px-4 text-sm text-white"
                onClick={savePickedColor}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  
      </div>
    </div>
  );
};

