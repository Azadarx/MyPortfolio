import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { X, Stethoscope, Users, Target } from "lucide-react";

// Import product images
import vetadewSerum from "../../assets/products/Vetadew_serum.jpg";
import vetadewGlowFw from "../../assets/products/Vetadew_fw.jpg";
import follideepShampoo from "../../assets/products/Follideep_shampoo.jpg";
import follideepSerum from "../../assets/products/Follideep.jpg";
import vetadewMoistCream from "../../assets/products/Vetadew_Moist_cream.jpg";
import vetadewLotion from "../../assets/products/Vetadew_lotion.jpg";
import vetadewGlowCream from "../../assets/products/Vetadew_glow_cream.jpg";
import sebotri from "../../assets/products/Sebotri.jpg";
import yugen from "../../assets/products/yugen.jpg";
import luligma from "../../assets/products/Luligma.jpg";
import eberstat from "../../assets/products/eberstat.jpg";
import itraNxt from "../../assets/products/itra_nxt.jpg";
import ketobenz from "../../assets/products/ketobenz.jpg";
import mofortF from "../../assets/products/mofort-f.jpg";
import mofort from "../../assets/products/mofort.jpg";
import vetadewSoap from "../../assets/products/vetadew_soap.jpg";
import clpFort from "../../assets/products/clp_fort.jpg";

const Products = () => {
  const { currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const products = [
    {
      id: 1,
      brand: "Vetadew Glow Serum",
      molecule:
        "Niacinamide 10% + Zinc PCA 0.2% + Matmarine 0.2% + Acetyl Glucosamine 0.3%",
      therapy: "Cosmetic Dermatology",
      image: vetadewSerum,
      usp: "Clinical-strength formulation for visible skin clarity, sebum control, and radiance through synergistic active combination",
      targetDoctors: "Dermatologists, Cosmetologists",
      positioning:
        "First-line recommendation for patients seeking oil balance and brightness in non-comedogenic daily skincare",
    },
    {
      id: 2,
      brand: "Vetadew Glow Face Wash",
      molecule:
        "Glycolic Acid + Lactic Acid + Glycerine + Niacinamide + Kojic Acid",
      therapy: "Cosmetic Dermatology",
      image: vetadewGlowFw,
      usp: "Advanced skin radiance cleanser with multi-acid exfoliation and skin brightening actives for improved texture and tone",
      targetDoctors: "Dermatologists, Aesthetic Physicians",
      positioning:
        "Daily cleansing adjunct for patients on anti-pigmentation or skin brightening regimens",
    },
    {
      id: 3,
      brand: "Follideep Shampoo",
      molecule:
        "Synergistic Complex with Encapsulated Actives + Ceramide III + Caffeine",
      therapy: "Hair Care Dermatology",
      image: follideepShampoo,
      usp: "Hair revitalizing shampoo that protects from breakage, reduces hair loss, and promotes volumizing effect with bond-building technology",
      targetDoctors: "Dermatologists, Trichologists",
      positioning:
        "Recommended for patients with hair thinning, breakage concerns, or undergoing hair loss management",
    },
    {
      id: 4,
      brand: "Vetadew Intense Moisturizing Cream",
      molecule: "Paraben-Free + Fragrance-Free Moisturizing Base",
      therapy: "General Dermatology",
      image: vetadewMoistCream,
      usp: "Higher standard intensive moisturization for facial skin with non-greasy, sulphate-free formulation suitable for sensitive skin",
      targetDoctors: "Dermatologists, General Physicians",
      positioning:
        "Daily facial moisturizer for patients requiring intense hydration without irritation risk",
    },
    {
      id: 5,
      brand: "Vetadew Intense Moisturizing Lotion",
      molecule:
        "Cocoa Butter + Glycerine + Shea Butter + Mango Butter + Dimethicone + Kokum Butter",
      therapy: "General Dermatology",
      image: vetadewLotion,
      usp: "Intense hydration for up to 12 hours with natural butter complex, free from parabens and animal-origin ingredients",
      targetDoctors: "Dermatologists, General Physicians",
      positioning:
        "Body moisturizer for severe dry skin conditions requiring barrier support and deep moisturization",
    },
    {
      id: 6,
      brand: "Vetadew Glow Radiance Cream",
      molecule:
        "Kojic Acid Dipalmitate + Arbutin + Tetrahydrocurcumin + Liquorice Extract + Niacinamide",
      therapy: "Cosmetic Dermatology",
      image: vetadewGlowCream,
      usp: "Power of 5 ingredients for melasma, hyperpigmentation management through multiple pathways of melanogenesis inhibition",
      targetDoctors: "Dermatologists, Cosmetologists",
      positioning:
        "Add-on therapy for patients with melasma, post-inflammatory hyperpigmentation, and uneven skin tone concerns",
    },
    {
      id: 7,
      brand: "Sebotri Shampoo",
      molecule: "Ketoconazole 2% w/w + Zinc Pyrithione 1% w/w",
      therapy: "Fungal Dermatology",
      image: sebotri,
      usp: "5 problems, 1 solution - highly effective in preventing dandruff recurrence, reducing hair shedding, and improving scalp condition",
      targetDoctors: "Dermatologists, General Physicians",
      positioning:
        "First-line prescription for seborrheic dermatitis, severe dandruff, and fungal scalp conditions requiring clinical intervention",
    },
    {
      id: 8,
      brand: "Yugen UV Sunscreen Gel",
      molecule: "Suncat DE + Vitamin E + Niacinamide (SPF 50, PA++++)",
      therapy: "Photoprotection Dermatology",
      image: yugen,
      usp: "Broad-spectrum UVA/UVB/HEV protection with silicone base, blue light defense, velvety matte finish, suitable for all skin types",
      targetDoctors: "Dermatologists, Aesthetic Physicians",
      positioning:
        "Daily photoprotection essential for all patients, especially those on photosensitizing treatments or with pigmentation concerns",
    },
    {
      id: 9,
      brand: "Follideep Hair Serum",
      molecule: "Herbocell + Biotin + Keratin + Redensyl + Collagen Peptides",
      therapy: "Hair Care Dermatology",
      image: follideepSerum,
      usp: "Advanced scalp stem cell therapy for hair growth with herbocell vasodilator action, targeting androgenic alopecia and telogen effluvium",
      targetDoctors: "Dermatologists, Trichologists",
      positioning:
        "Adjuvant therapy for patients with androgenic alopecia, FPH loss, and telogen effluvium requiring follicle stimulation",
    },
    {
      id: 10,
      brand: "Luligma Cream",
      molecule: "Luliconazole 1% w/w",
      therapy: "Fungal Dermatology",
      image: luligma,
      usp: "Novel approach with unique pharmacokinetics, strong clinical antifungal activity with low resistance chances and unique behavior in combination treatment",
      targetDoctors: "Dermatologists",
      positioning:
        "First-line therapy for dermatophytosis, tinea infections with superior efficacy profile",
    },
    {
      id: 11,
      brand: "Eberstat Cream",
      molecule: "Eberconazole 1% w/w",
      therapy: "Fungal Dermatology",
      image: eberstat,
      usp: "Effective treatment for dermatophyte-produced fungal infections with good safety and tolerability, anti-inflammatory action against gram-positive bacteria",
      targetDoctors: "Dermatologists, General Physicians",
      positioning:
        "Indicated for dermatophytosis, tinea corporis, tinea cruris, tinea pedis, and candidiasis",
    },
    {
      id: 12,
      brand: "Itra-NXT Capsules",
      molecule: "Itraconazole BP 100mg/200mg",
      therapy: "Fungal Dermatology",
      image: itraNxt,
      usp: "Broad spectrum efficacy against aspergillosis, candidiasis, fungal nail infections with novel pellet technology for maximum absorption and better bioavailability",
      targetDoctors: "Dermatologists",
      positioning:
        "Systemic antifungal therapy for onychomycosis and invasive fungal infections requiring oral intervention",
    },
    {
      id: 13,
      brand: "Ketobenz Soap",
      molecule: "Ketoconazole 2%",
      therapy: "Fungal Dermatology",
      image: ketobenz,
      usp: "Adjuvant therapy for tinea versicolor, dandruff, and fungal infections with 34% mycological cure rate, prophylactic treatment option",
      targetDoctors: "Dermatologists, General Physicians",
      positioning:
        "Adjuvant cleansing therapy for recurrence prevention in tinea versicolor and seborrheic dermatitis",
    },
    {
      id: 14,
      brand: "Mofort-F Cream",
      molecule: "Mometasone Furoate + Fusidic Acid",
      therapy: "General Dermatology",
      image: mofortF,
      usp: "Safe potent corticosteroid combined with time-tested antibiotic for resistant dermatoses with bacterial infection component",
      targetDoctors: "Dermatologists, General Physicians",
      positioning:
        "Indicated for impetigo, pyoderma, eczema, urticaria, boil/abscess where bacterial infection is present or likely",
    },
    {
      id: 15,
      brand: "Mofort Cream",
      molecule: "Mometasone Furoate 0.1%",
      therapy: "General Dermatology",
      image: mofort,
      usp: "Proven efficacy mid-potent steroid with longer remission, minimal cutaneous penetration, once daily advantage for inflammatory dermatoses",
      targetDoctors: "Dermatologists, Pediatricians",
      positioning:
        "First-line topical corticosteroid for eczema, dermatitis, and glucocorticoid-responsive dermatoses requiring controlled inflammation management",
    },
    {
      id: 16,
      brand: "Vetadew Soap",
      molecule:
        "Grade I Moisturising Soap with Vitamin E + Malaysian Soap Noodles",
      therapy: "General Dermatology",
      image: vetadewSoap,
      usp: "Skin-friendly pH, non-irritating mild cleansing with emollient moisturising properties for psoriasis, xerosis, dry eczema, atopic and contact dermatitis",
      targetDoctors: "Dermatologists, Pediatricians",
      positioning:
        "Daily cleansing bar for patients with compromised skin barrier requiring gentle, non-stripping cleansing",
    },
    {
      id: 17,
      brand: "CLP-Fort Cream",
      molecule: "Clobetasol Propionate IP",
      therapy: "General Dermatology",
      image: clpFort,
      usp: "Super-potent corticosteroid for quicker and better clearance, first-line treatment for all grades of psoriasis with significant reduction in scaling and induration",
      targetDoctors: "Dermatologists",
      positioning:
        "Reserved for severe inflammatory dermatoses, resistant psoriasis, and cases requiring rapid symptom control under close supervision",
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

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.therapy === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="products"
      className={`relative py-16 px-4 ${
        isDark ? "bg-slate-900" : "bg-slate-50"
      } overflow-hidden min-h-screen transition-colors duration-300`}
    >
      <div
        className={`absolute inset-0 w-full h-full ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.15),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(79,70,229,0.1),transparent_50%)]"
            : "bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.08),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(79,70,229,0.06),transparent_50%)]"
        }`}
      />

      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-5 animate-pulse"></div>
      <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-indigo-600 rounded-full filter blur-3xl opacity-5 animate-pulse"></div>

      <div className="relative mt-10 z-10 w-full max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className={`text-4xl sm:text-5xl font-bold ${
              isDark ? "text-white" : "text-slate-900"
            } mb-4 transition-colors duration-300`}
          >
            Products & Therapy Portfolio
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 mx-auto mb-6"></div>
          <p
            className={`text-lg ${
              isDark ? "text-slate-300" : "text-slate-600"
            } max-w-2xl mx-auto transition-colors duration-300`}
          >
            ASV Dermatology Division - Ethical pharmaceutical solutions for
            comprehensive skin and hair care
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : isDark
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              onClick={() => setSelectedProduct(product)}
              className={`rounded-xl ${
                isDark
                  ? "bg-slate-800/60 backdrop-blur-sm border-slate-700/50"
                  : "bg-white/80 backdrop-blur-sm border-slate-200/70"
              } border p-5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 group`}
            >
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.brand}
                  className="w-full h-auto"
                />
              </div>
              <h3
                className={`text-base font-semibold mb-2 ${
                  isDark ? "text-white" : "text-slate-900"
                } group-hover:text-blue-600 transition-colors`}
              >
                {product.brand}
              </h3>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  isDark
                    ? "bg-blue-900/40 text-blue-300"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {product.therapy}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Products", value: "17+" },
            { label: "Therapy Areas", value: "5" },
            { label: "Active Coverage", value: "50+" },
            { label: "Doctors", value: "100+" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`text-center p-6 rounded-xl ${
                isDark
                  ? "bg-slate-800/60 border-slate-700/50"
                  : "bg-white/80 border-slate-200/70"
              } border shadow-lg`}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl ${
                isDark
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } border shadow-2xl`}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-inherit">
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {selectedProduct.brand}
                </h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className={`p-2 rounded-lg ${
                    isDark
                      ? "hover:bg-slate-700 text-slate-400"
                      : "hover:bg-slate-100 text-slate-600"
                  } transition-colors`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="w-full border-b border-slate-200 dark:border-slate-700">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.brand}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    <h3
                      className={`text-lg font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Composition
                    </h3>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    } pl-7`}
                  >
                    {selectedProduct.molecule}
                  </p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <h3
                      className={`text-lg font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Therapy Area
                    </h3>
                  </div>
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ml-7 ${
                      isDark
                        ? "bg-blue-900/40 text-blue-300"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {selectedProduct.therapy}
                  </div>
                </div>

                <div
                  className={`rounded-xl p-5 ${
                    isDark
                      ? "bg-slate-900/40 border-slate-700/30"
                      : "bg-blue-50/50 border-blue-100"
                  } border`}
                >
                  <h3
                    className={`text-base font-semibold mb-3 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Unique Selling Proposition
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {selectedProduct.usp}
                  </p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h3
                      className={`text-lg font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Target Prescribers
                    </h3>
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    } pl-7`}
                  >
                    {selectedProduct.targetDoctors}
                  </p>
                </div>

                <div
                  className={`rounded-xl p-5 ${
                    isDark
                      ? "bg-gradient-to-br from-blue-900/20 to-slate-800/40 border-blue-900/30"
                      : "bg-gradient-to-br from-blue-50 to-slate-50 border-blue-100"
                  } border`}
                >
                  <h3
                    className={`text-base font-semibold mb-3 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Positioning Strategy
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {selectedProduct.positioning}
                  </p>
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
