import api from "../../../shared/services/api";

/**
 * Crée un enregistrement de don dans la base de données.
 * Utilisé pour tous les modes de paiement.
 */
export const createDonation = (payload) =>
  api.post("/donations/create/", payload);

/**
 * Lance un paiement CinetPay (Wave, Orange Money, Moov, Visa, Google Pay…).
 * Retourne { payment_url, transaction_id } depuis le backend.
 */
export const initCinetpayCheckout = (payload) =>
  api.post("/cinepay/cinetpay/create/", payload);

/**
 * Récupère la liste des dons (admin).
 */
export const getDonations = (params) =>
  api.get("/donations/", { params });
