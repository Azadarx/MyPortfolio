import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Stethoscope, Users, Target, ZoomIn, Sparkles, TrendingUp } from "lucide-react";

const CLOUDINARY_BASE = "https://res.cloudinary.com/dbofquzdr/image/upload";

const productImages = {
  vetadewSerum: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824523/Vetadew_serum_tvzzh4.jpg`,
  vetadewGlowFw: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824512/Vetadew_fw_j1pye2.jpg`,
  follideepShampoo: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824501/Follideep_shampoo_emblmj.jpg`,
  follideepSerum: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824500/Follideep_pvlcio.jpg`,
  vetadewMoistCream: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824515/Vetadew_Moist_cream_zr0hr7.jpg`,
  vetadewLotion: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824516/Vetadew_lotion_lwcbx1.jpg`,
  vetadewGlowCream: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824510/Vetadew_glow_cream_kk2w6r.jpg`,
  sebotri: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824509/Sebotri_ri5ig3.jpg`,
  yugen: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824522/yugen_fmhpk9.jpg`,
  luligma: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824502/Luligma_zndq80.jpg`,
  eberstat: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824503/eberstat_aqy22a.jpg`,
  itraNxt: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824502/itra_nxt_kn4dws.jpg`,
  ketobenz: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824503/ketobenz_qtenhx.jpg`,
  mofortF: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824503/mofort-f_kudmrx.jpg`,
  mofort: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824503/mofort_hozzns.jpg`,
  vetadewSoap: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824521/vetadew_soap_ukydoo.jpg`,
  clpFort: `${CLOUDINARY_BASE}/f_auto,q_auto:best/v1766824500/clp_fort_k6qb4a.jpg`,
};

const Products = () => {
  const [isDark] = useState(true); // Connect to your ThemeContext
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [imageZoom, setImageZoom] = useState(1);

  const products = [
    {
      id: 1,
      brand: "Vetadew Glow Serum",
      molecule: "Niacinamide 10% + Zinc PCA 0.2% + Matmarine 0.2% + Acetyl Glucosamine 0.3%",
      therapy: "Cosmetic Dermatology",
      image: productImages.vetadewSerum,
      usp: "Clinical-strength formulation for visible skin clarity, sebum control, and radiance through synergistic active combination",
      targetDoctors: "Dermatologists, Cosmetologists",
      positioning: "First-line recommendation for patients seeking oil balance and brightness in non-comedogenic daily skincare",
    },
    {
      id: 2,
      brand: "Vetadew Glow Face Wash",
      molecule: "Glycolic Acid + Lactic Acid + Glycerine + Niacinamide + Kojic Acid",
      therapy: "Cosmetic Dermatology",
      image: productImages.vetadewGlowFw,
      usp: "Advanced skin radiance cleanser with multi-acid exfoliation and skin brightening actives for improved texture and tone",
      targetDoctors: "Dermatologists, Aesthetic Physicians",
      positioning: "Daily cleansing adjunct for patients on anti-pigmentation or skin brightening regimens",
    },
    {
      id: 3,
      brand: "Follideep Shampoo",
      molecule: "Synergistic Complex with Encapsulated Actives + Ceramide III + Caffeine",
      therapy: "Hair Care Dermatology",
      image: productImages.follideepShampoo,
      usp: "Hair revitalizing shampoo that protects from breakage, reduces hair loss, and promotes volumizing effect with bond-building technology",
      targetDoctors: "Dermatologists, Trichologists",
      positioning: "Recommended for patients with hair thinning, breakage concerns, or undergoing hair loss management",
    },
    {
      id: 4,
      brand: "Vetadew Intense Moisturizing Cream",
      molecule: "Paraben-Free + Fragrance-Free Moisturizing Base",
      therapy: "General Dermatology",
      image: productImages.vetadewMoistCream,
      usp: "Higher standard intensive moisturization for facial skin with non-greasy, sulphate-free formulation suitable for sensitive skin",
      targetDoctors: "Dermatologists, General Physicians",
      positioning: "Daily facial moisturizer for patients requiring intense hydration without irritation risk",
    },
    {
      id: 5,
      brand: "Vetadew Intense Moisturizing Lotion",
      molecule: "Cocoa Butter + Glycerine + Shea Butter + Mango Butter + Dimethicone + Kokum Butter",
      therapy: "General Dermatology",
      image: productImages.vetadewLotion,
      usp: "Intense hydration for up to 12 hours with natural butter complex, free from parabens and animal-origin ingredients",
      targetDoctors: "Dermatologists, General Physicians",
      positioning: "Body moisturizer for severe dry skin conditions requiring barrier support and deep moisturization",
    },
    {
      id: 6,
      brand: "Vetadew Glow Radiance Cream",
      molecule: "Kojic Acid Dipalmitate + Arbutin + Tetrahydrocurcumin + Liquorice Extract + Niacinamide",
      therapy: "Cosmetic Dermatology",
      image: productImages.vetadewGlowCream,
      usp: "Power of 5 ingredients for melasma, hyperpigmentation management through multiple pathways of melanogenesis inhibition",
      targetDoctors: "Dermatologists, Cosmetologists",
      positioning: "Add-on therapy for patients with melasma, post-inflammatory hyperpigmentation, and uneven skin tone concerns",
    },
    {
      id: 7,
      brand: "Sebotri Shampoo",
      molecule: "Ketoconazole 2% w/w + Zinc Pyrithione 1% w/w",
      therapy: "Fungal Dermatology",
      image: productImages.sebotri,
      usp: "5 problems, 1 solution - highly effective in preventing dandruff recurrence, reducing hair shedding, and improving scalp condition",
      targetDoctors: "Dermatologists, General Physicians",
      positioning: "First-line prescription for seborrheic dermatitis, severe dandruff, and fungal scalp conditions requiring clinical intervention",
    },
    {
      id: 8,
      brand: "Yugen UV Sunscreen Gel",
      molecule: "Suncat DE + Vitamin E + Niacinamide (SPF 50, PA++++)",
      therapy: "Photoprotection Dermatology",
      image: productImages.yugen,
      usp: "Broad-spectrum UVA/UVB/HEV protection with silicone base, blue light defense, velvety matte finish, suitable for all skin types",
      targetDoctors: "Dermatologists, Aesthetic Physicians",
      positioning: "Daily photoprotection essential for all patients, especially those on photosensitizing treatments or with pigmentation concerns",
    },
    {
      id: 9,
      brand: "Follideep Hair Serum",
      molecule: "Herbocell + Biotin + Keratin + Redensyl + Collagen Peptides",
      therapy: "Hair Care Dermatology",
      image: productImages.follideepSerum,
      usp: "Advanced scalp stem cell therapy for hair growth with herbocell vasodilator action, targeting androgenic alopecia and telogen effluvium",
      targetDoctors: "Dermatologists, Trichologists",
      positioning: "Adjuvant therapy for patients with androgenic alopecia, FPH loss, and telogen effluvium requiring follicle stimulation",
    },
    {
      id: 10,
      brand: "Luligma Cream",
      molecule: "Luliconazole 1% w/w",
      therapy: "Fungal Dermatology",
      image: productImages.luligma,
      usp: "Novel approach with unique pharmacokinetics, strong clinical antifungal activity with low resistance chances and unique behavior in combination treatment",
      targetDoctors: "Dermatologists",
      positioning: "First-line therapy for dermatophytosis, tinea infections with superior efficacy profile",
    },
    {
      id: 11,
      brand: "Eberstat Cream",
      molecule: "Eberconazole 1% w/w",
      therapy: "Fungal Dermatology",
      image: productImages.eberstat,
      usp: "Effective treatment for dermatophyte-produced fungal infections with good safety and tolerability, anti-inflammatory action against gram-positive bacteria",
      targetDoctors: "Dermatologists, General Physicians",
      positioning: "Indicated for dermatophytosis, tinea corporis, tinea cruris, tinea pedis, and candidiasis",
    },
    {
      id: 12,
      brand: "Itra-NXT Capsules",
      molecule: "Itraconazole BP 100mg/200mg",
      therapy: "Fungal Dermatology",
      image: productImages.itraNxt,
      usp: "Broad spectrum efficacy against aspergillosis, candidiasis, fungal nail infections with novel pellet technology for maximum absorption and better bioavailability",
      targetDoctors: "Dermatologists",
      positioning: "Systemic antifungal therapy for onychomycosis and invasive fungal infections requiring oral intervention",
    },
    {
      id: 13,
      brand: "Ketobenz Soap",
      molecule: "Ketoconazole 2%",
      therapy: "Fungal Dermatology",
      image: productImages.ketobenz,
      usp: "Adjuvant therapy for tinea versicolor, dandruff, and fungal infections with 34% mycological cure rate, prophylactic treatment option",
      targetDoctors: "Dermatologists, General Physicians",
      positioning: "Adjuvant cleansing therapy for recurrence prevention in tinea versicolor and seborrheic dermatitis",
    },
    {
      id: 14,
      brand: "Mofort-F Cream",
      molecule: "Mometasone Furoate + Fusidic Acid",
      therapy: "General Dermatology",
      image: productImages.mofortF,
      usp: "Safe potent corticosteroid combined with time-tested antibiotic for resistant dermatoses with bacterial infection component",
      targetDoctors: "Dermatologists, General Physicians",
      positioning: "Indicated for impetigo, pyoderma, eczema, urticaria, boil/abscess where bacterial infection is present or likely",
    },
    {
      id: 15,
      brand: "Mofort Cream",
      molecule: "Mometasone Furoate 0.1%",
      therapy: "General Dermatology",
      image: productImages.mofort,
      usp: "Proven efficacy mid-potent steroid with longer remission, minimal cutaneous penetration, once daily advantage for inflammatory dermatoses",
      targetDoctors: "Dermatologists, Pediatricians",
      positioning: "First-line topical corticosteroid for eczema, dermatitis, and glucocorticoid-responsive dermatoses requiring controlled inflammation management",
    },
    {
      id: 16,
      brand: "Vetadew Soap",
      molecule: "Grade I Moisturising Soap with Vitamin E + Malaysian Soap Noodles",
      therapy: "General Dermatology",
      image: productImages.vetadewSoap,
      usp: "Skin-friendly pH, non-irritating mild cleansing with emollient moisturising properties for psoriasis, xerosis, dry eczema, atopic and contact dermatitis",
      targetDoctors: "Dermatologists, Pediatricians",
      positioning: "Daily cleansing bar for patients with compromised skin barrier requiring gentle, non-stripping cleansing",
    },
    {
      id: 17,
      brand: "CLP-Fort Cream",
      molecule: "Clobetasol Propionate IP",
      therapy: "General Dermatology",
      image: productImages.clpFort,
      usp: "Super-potent corticosteroid for quicker and better clearance, first-line treatment for all grades of psoriasis with significant reduction in scaling and induration",
      targetDoctors: "Dermatologists",
      positioning: "Reserved for severe inflammatory dermatoses, resistant psoriasis, and cases requiring rapid symptom control under close supervision",
    },
  ];

  const categories = [
    "All",
    "Cosmetic Dermatology",
    "Hair Care Dermatology",
    "Fungal Dermatology",
    "General Dermatology",
    "Photoprotection Dermatology",
  ];

  const filteredProducts = activeFilter === "All" ? products : products.filter((p) => p.therapy === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section
      id="products"
      className={`relative py-20 px-4 ${isDark ? "bg-slate-900" : "bg-slate-50"} overflow-hidden min-h-screen transition-colors duration-300`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.15),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(79,70,229,0.1),transparent_50%)]" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-5 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative mt-10 z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-12 h-12 text-blue-600" />
          </motion.div>
          
          <h1 className={`text-4xl md:text-6xl font-bold ${isDark ? "text-white" : "text-slate-900"} mb-4`}>
            Products & Therapy Portfolio
          </h1>
          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 mx-auto mb-6 rounded-full" />
          <p className={`text-lg md:text-xl ${isDark ? "text-slate-300" : "text-slate-600"} max-w-3xl mx-auto leading-relaxed`}>
            ASV Dermatology Division - Ethical pharmaceutical solutions for comprehensive skin and hair care
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12 px-2"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeFilter === category
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/40"
                  : isDark
                  ? "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border-2 border-slate-700/50 hover:border-slate-600"
                  : "bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              onClick={() => setSelectedProduct(product)}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`rounded-2xl ${
                isDark ? "bg-slate-800/80 backdrop-blur-sm border-slate-700/60" : "bg-white/90 backdrop-blur-sm border-slate-200"
              } border-2 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden`}
            >
              {/* Image Container - NO BACKGROUND */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.brand}
                  className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Badge */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm rounded-full text-xs font-bold text-white flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    View Details
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 border-t-2 border-slate-700/30">
                <h3 className={`text-base font-bold mb-3 line-clamp-2 min-h-[3rem] ${isDark ? "text-white" : "text-slate-900"} group-hover:text-blue-500 transition-colors`}>
                  {product.brand}
                </h3>
                <div className={`inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold ${isDark ? "bg-blue-900/50 text-blue-300 border border-blue-700/50" : "bg-blue-50 text-blue-700 border border-blue-200"}`}>
                  {product.therapy}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: "Products", value: "17+", icon: "📦" },
            { label: "Therapy Areas", value: "5", icon: "🎯" },
            { label: "Active Coverage", value: "50+", icon: "📍" },
            { label: "Doctors", value: "100+", icon: "👨‍⚕️" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`text-center p-8 rounded-2xl ${isDark ? "bg-slate-800/80 border-slate-700/60" : "bg-white/90 border-slate-200"} border-2 shadow-xl hover:shadow-2xl transition-all duration-300`}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className={`text-sm font-semibold ${isDark ? "text-slate-400" : "text-slate-600"}`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedProduct(null);
              setImageZoom(1);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-3xl ${
                isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
              } border-2 shadow-2xl`}
            >
              {/* Header */}
              <div className={`sticky top-0 z-10 flex items-center justify-between p-8 border-b-2 ${isDark ? "border-slate-700 bg-slate-800/95" : "border-slate-200 bg-white/95"} backdrop-blur-sm`}>
                <div>
                  <h2 className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-slate-900"} mb-1`}>
                    {selectedProduct.brand}
                  </h2>
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold mt-2 ${isDark ? "bg-blue-900/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                    {selectedProduct.therapy}
                  </div>
                </div>
                <motion.button
                  onClick={() => {
                    setSelectedProduct(null);
                    setImageZoom(1);
                  }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-xl ${isDark ? "hover:bg-slate-700 text-slate-400 hover:text-white" : "hover:bg-slate-100 text-slate-600"} transition-all`}
                >
                  <X className="w-7 h-7" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
                {/* Image Section - NO BACKGROUND */}
                <div className="relative w-full border-b-2 border-slate-700/30 p-8">
                  <div className="relative w-full max-w-2xl mx-auto">
                    <motion.img
                      src={selectedProduct.image}
                      alt={selectedProduct.brand}
                      className="w-full h-auto object-contain cursor-zoom-in transition-transform duration-300 max-h-[500px]"
                      style={{ 
                        transform: `scale(${imageZoom})`,
                        imageRendering: "crisp-edges"
                      }}
                      onClick={() => setImageZoom(imageZoom === 1 ? 1.5 : 1)}
                      whileHover={{ scale: imageZoom === 1 ? 1.05 : imageZoom }}
                    />
                    <motion.div 
                      className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ZoomIn className="w-5 h-5" />
                      Click to {imageZoom === 1 ? "zoom" : "reset"}
                    </motion.div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-8 space-y-8">
                  {/* Composition */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Composition</h3>
                    </div>
                    <p className={`text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"} ml-13`}>
                      {selectedProduct.molecule}
                    </p>
                  </motion.div>

                  {/* USP */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`rounded-2xl p-8 ${isDark ? "bg-gradient-to-br from-blue-900/30 to-slate-800/30 border-blue-700/30" : "bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200"} border-2`}
                  >
                    <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      Unique Selling Proposition
                    </h3>
                    <p className={`text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      {selectedProduct.usp}
                    </p>
                  </motion.div>

                  {/* Target Doctors */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Target Prescribers</h3>
                    </div>
                    <p className={`text-base ${isDark ? "text-slate-300" : "text-slate-700"} ml-13 font-medium`}>
                      {selectedProduct.targetDoctors}
                    </p>
                  </motion.div>

                  {/* Positioning Strategy */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`rounded-2xl p-8 ${isDark ? "bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-700/30" : "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200"} border-2`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                        Positioning Strategy
                      </h3>
                    </div>
                    <p className={`text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      {selectedProduct.positioning}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Products;