"use client";

import { useState, useEffect, useMemo } from "react";
import { useSWRDetailActivity } from "@/hooks/useSWRDetailActivity";
import { useActivityByCategory } from "@/hooks/useActivityByCategory";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { format } from "date-fns";
import { enUS as localeEn } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ReviewForm } from "@/components/ui/user/review-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  MapPin,
  Star,
  Calendar as CalendarIcon,
  Minus,
  Plus,
  ChevronRight,
  MessageCircle, // Mengubah dari Loader2 menjadi MessageCircle untuk ikon WhatsApp
} from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

const PLACEHOLDER_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMDAwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00ODcuNSAzMTJIMzc1TDQzNy41IDI1MEw1NjIuNSAyNTBMNTAwIDMxMkg0ODcuNVoiIGZpbGw9IiNEMUQ1REIiLz4KPGNpcmNsZSBjeD0iNDM3LjUiIGN5PSIyNTAiIHI9IjEyLjUiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+";

const exampleReviews = [
  {
    id: 1,
    user: { name: "Budi Santoso", avatarUrl: "https://github.com/shadcn.png" },
    rating: 5,
    comment: "An absolutely amazing experience!",
    createdAt: "2024-05-20T10:00:00Z",
  },
  {
    id: 2,
    user: { name: "Citra Lestari", avatarUrl: "https://github.com/shadcn.png" },
    rating: 4,
    comment: "Very fun for the family.",
    createdAt: "2024-05-18T14:30:00Z",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export function DetailActivityClient({ initialActivity }) {
  const router = useRouter();
  const pathname = usePathname();

  const { detailActivity } = useSWRDetailActivity(
    initialActivity.id,
    initialActivity
  );
  const { activityByCategory } = useActivityByCategory(
    detailActivity?.categoryId
  );
  // const { addToCart, isLoading: isAddingToCart } = useCart(); // Baris ini tidak digunakan lagi, bisa dihapus atau dikomentari
  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleIncrement = () => setQuantity((prev) => prev + 1);

  // Fungsi baru untuk WhatsApp
  const handleOrderOnWhatsapp = () => {
    if (!selectedDate) {
      toast.warning("Please select a date first.");
      return;
    }

    // Ganti dengan nomor WhatsApp tujuan
    const phoneNumber = "6281234567890";

    // Format tanggal
    const formattedDate = format(selectedDate, "dd MMMM yyyy", {
      locale: localeEn,
    });

    // Pesan yang akan dikirim
    const message = `Halo, saya ingin memesan aktivitas berikut:\n\n- Aktivitas: ${
      detailActivity.title
    }\n- Tanggal: ${formattedDate}\n- Jumlah Orang: ${quantity}\n- Total Harga: ${new Intl.NumberFormat(
      "id-ID",
      { style: "currency", currency: "IDR", minimumFractionDigits: 0 }
    ).format(totalPrice)}\n\nTerima kasih.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Buka tab baru
    window.open(whatsappUrl, "_blank");
  };

  if (!detailActivity) {
    return <div>Loading...</div>;
  }

  const price = Number(detailActivity.price) || 0;
  const priceDiscount = Number(detailActivity.price_discount) || 0;
  const displayPrice = priceDiscount > 0 ? priceDiscount : price;
  const showStrikethrough = priceDiscount > 0 && price > priceDiscount;
  const totalPrice = displayPrice * quantity;
  const { reviews = exampleReviews } = detailActivity;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-8 bg-white"
    >
      <div className="container px-4 mx-auto max-w-7xl">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/activity">Activities</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{detailActivity.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-2/3">
            <motion.div
              variants={itemVariants}
              className="p-4 bg-white border border-gray-200 rounded-lg"
            >
              <h1 className="mb-3 text-lg font-bold tracking-tight text-gray-900 sm:text-xl md:text-2xl">
                {detailActivity.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mb-3 text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold">
                    {detailActivity.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({detailActivity.total_reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="text-xs">{detailActivity.address}</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="mt-4 overflow-hidden bg-white border border-gray-200 rounded-lg"
            >
              <div className="relative w-full h-64">
                <img
                  src={detailActivity.imageUrls?.[0] || PLACEHOLDER_DATA_URL}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = PL;
                  }}
                  alt={detailActivity.title || "Activity image"}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="p-4 mt-4 bg-white border border-gray-200 rounded-lg"
            >
              <h2 className="mb-3 text-base font-bold tracking-tight text-gray-900 sm:text-lg">
                About {detailActivity.title}
              </h2>
              <p className="text-sm leading-relaxed text-justify text-gray-700 whitespace-pre-line">
                {detailActivity.description}
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="p-4 mt-4 bg-white border border-gray-200 rounded-lg"
            >
              <h2 className="mb-3 text-base font-bold tracking-tight text-gray-900 sm:text-lg">
                Location
              </h2>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-blue-500" />
                <p className="text-sm text-gray-700">
                  {detailActivity.address}
                </p>
              </div>
              <div className="flex justify-center w-full h-full overflow-hidden text-gray-500 bg-white border border-gray-200 rounded-lg">
                <div
                  className="w-full overflow-hidden rounded-lg [&>iframe]:w-full"
                  dangerouslySetInnerHTML={{
                    __html: detailActivity.location_maps,
                  }}
                />
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="p-4 mt-4 bg-white border border-gray-200 rounded-lg"
            >
              <h2 className="mb-3 text-base font-bold tracking-tight text-gray-900 sm:text-lg">
                User Reviews ({reviews.length})
              </h2>
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex gap-3 p-3 border border-gray-200 rounded bg-gray-50"
                  >
                    <Avatar>
                      <AvatarImage
                        src={review.user.avatarUrl}
                        alt={review.user.name}
                      />
                      <AvatarFallback className="text-blue-600 bg-blue-100">
                        {review.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900">
                          {review.user.name}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-yellow-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{review.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </p>
                      <p className="mt-1 text-xs text-gray-700">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
                {user && <ReviewForm activityId={initialActivity.id} />}
              </div>
            </motion.div>
          </div>
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <motion.div
                variants={itemVariants}
                className="p-4 bg-white border border-gray-200 rounded-lg"
              >
                <div className="mb-3">
                  {displayPrice > 0 ? (
                    <>
                      {showStrikethrough && (
                        <span className="text-sm text-gray-400 line-through">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(price)}
                        </span>
                      )}
                      <p
                        className={`text-lg font-bold ${
                          showStrikethrough ? "text-blue-600" : "text-gray-900"
                        }`}
                      >
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(displayPrice)}
                      </p>
                      <p className="text-xs text-gray-600">/ person</p>
                    </>
                  ) : (
                    <p className="text-base font-bold text-gray-700">
                      Price not available
                    </p>
                  )}
                </div>
                {displayPrice > 0 && (
                  <>
                    <div className="space-y-4">
                      <div className="grid w-full gap-2">
                        <Label
                          htmlFor="date"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Select Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal border-2 border-blue-200 hover:border-blue-300 rounded-xl transition-all duration-200 hover:shadow-md",
                                !selectedDate && "text-muted-foreground",
                                selectedDate && "border-blue-400 bg-blue-50"
                              )}
                            >
                              <CalendarIcon className="w-4 h-4 mr-2 text-blue-600" />
                              {selectedDate ? (
                                format(selectedDate, "PPP", {
                                  locale: localeEn,
                                })
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 border-2 border-blue-200 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-sm"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                              className="rounded-2xl"
                              classNames={{
                                months:
                                  "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                month: "space-y-4",
                                caption:
                                  "flex justify-center pt-1 relative items-center",
                                caption_label:
                                  "text-sm font-semibold text-gray-900",
                                nav: "space-x-1 flex items-center",
                                nav_button:
                                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-blue-50 rounded-lg transition-all duration-200",
                                nav_button_previous: "absolute left-1",
                                nav_button_next: "absolute right-1",
                                table: "w-full border-collapse space-y-1",
                                head_row: "flex",
                                head_cell:
                                  "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                                row: "flex w-full mt-2",
                                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-100 rounded-lg transition-all duration-200",
                                day_range_end: "day-range-end",
                                day_selected:
                                  "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white",
                                day_today:
                                  "bg-blue-100 text-blue-900 font-semibold",
                                day_outside:
                                  "day-outside text-gray-400 opacity-50 aria-selected:bg-accent/50 aria-selected:text-gray-400 aria-selected:opacity-30",
                                day_disabled: "text-gray-400 opacity-50",
                                day_range_middle:
                                  "aria-selected:bg-accent aria-selected:text-accent-foreground",
                                day_hidden: "invisible",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid w-full gap-2">
                        <Label
                          htmlFor="quantity"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Number of People / Quantity
                        </Label>
                        <div className="flex items-center justify-between p-4 border-2 border-blue-200 rounded-xl bg-white/50 backdrop-blur-sm">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleDecrement}
                            disabled={quantity <= 1}
                            className="transition-all duration-200 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-16 text-xl font-bold text-center text-gray-900">
                            {quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleIncrement}
                            className="transition-all duration-200 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="py-6 mt-6 border-t border-blue-100">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-gray-900">
                          Total
                        </p>
                        <p className="text-2xl font-bold text-blue-600">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(totalPrice)}
                        </p>
                      </div>
                    </div>
                    {/* Tombol yang sudah diubah ke WhatsApp */}
                    <Button
                      size="lg"
                      className="w-full text-lg transition-all duration-200 bg-green-600 shadow-lg hover:bg-green-700 hover:shadow-xl rounded-xl"
                      disabled={!selectedDate}
                      onClick={handleOrderOnWhatsapp}
                    >
                      <IconBrandWhatsapp className="w-6 h-6 mr-2" />
                      Order via WhatsApp
                    </Button>
                    <p className="mt-3 text-xs text-center text-gray-500">
                      Easy Cancellation & Full Refund
                    </p>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        {activityByCategory && activityByCategory.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-12"
          >
            <h2 className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">
              Similar Activities
            </h2>
            <Carousel
              opts={{ align: "start", loop: activityByCategory.length > 3 }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {activityByCategory.map((rec) => (
                  <CarouselItem
                    key={rec.id}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <motion.div variants={itemVariants}>
                      <Link
                        href={`/activity/${rec.id}`}
                        className="block h-full group"
                      >
                        <div className="flex flex-col h-full overflow-hidden transition-all duration-300 border border-blue-100 shadow-lg bg-white/90 backdrop-blur-sm rounded-3xl hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2">
                          <div className="relative w-full h-40">
                            <img
                              src={rec.imageUrls?.[0] || DEFAULT_ACTIVITY_IMAGE}
                              alt={rec.title || "Activity"}
                              className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = PLACEHOLDER_DATA_URL;
                              }}
                            />
                          </div>
                          <div className="flex flex-col flex-grow p-6">
                            <h3 className="font-semibold text-gray-900 truncate transition-colors duration-200 group-hover:text-blue-600">
                              {rec.title || "Name Not Available"}
                            </h3>
                            <p className="mb-2 text-sm text-gray-600 truncate">
                              <MapPin className="inline w-3 h-3 mr-1 text-blue-500" />
                              {rec.address || "Location Not Available"}
                            </p>
                            <p className="text-sm text-yellow-500">
                              <Star className="inline w-3 h-3 mr-1 fill-current" />
                              {rec.rating || "-"} ({rec.total_reviews || "0"}{" "}
                              Reviews)
                            </p>
                            <p className="pt-2 mt-auto text-lg font-bold text-blue-600">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              }).format(rec.price ?? 0) ||
                                "Price not available"}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {activityByCategory.length > 3 && (
                <>
                  <CarouselPrevious className="absolute left-[-20px] md:left-[-25px] top-1/2 -translate-y-1/2 z-10 hidden sm:flex border-blue-200 hover:border-blue-300 bg-white/90 backdrop-blur-sm" />
                  <CarouselNext className="absolute right-[-20px] md:right-[-25px] top-1/2 -translate-y-1/2 z-10 hidden sm:flex border-blue-200 hover:border-blue-300 bg-white/90 backdrop-blur-sm" />
                </>
              )}
            </Carousel>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
