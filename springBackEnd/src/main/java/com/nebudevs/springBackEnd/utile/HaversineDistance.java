package com.nebudevs.springBackEnd.utile;

public class HaversineDistance {

    // Rayon moyen de la Terre en kilomètres
    private static final double EARTH_RADIUS_KM = 6371.0;

    /**
     * Méthode statique qui calcule la distance entre deux points géographiques.
     *
     * @param lat1 Latitude du premier point
     * @param lon1 Longitude du premier point
     * @param lat2 Latitude du second point
     * @param lon2 Longitude du second point
     * @return Distance en kilomètres entre les deux points
     */
    public static double calculateHaversineDistance(double lat1, double lon1, double lat2, double lon2) {
        // Convertir les latitudes et longitudes de degrés en radians
        double lat1Rad = Math.toRadians(lat1);
        double lon1Rad = Math.toRadians(lon1);
        double lat2Rad = Math.toRadians(lat2);
        double lon2Rad = Math.toRadians(lon2);

        // Différences entre les coordonnées
        double deltaLat = lat2Rad - lat1Rad;
        double deltaLon = lon2Rad - lon1Rad;

        // Formule de Haversine
        double a = Math.pow(Math.sin(deltaLat / 2), 2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                        Math.pow(Math.sin(deltaLon / 2), 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Distance finale en kilomètres
        return EARTH_RADIUS_KM * c;
    }
    public static void main(String[] args) {
        // Coordonnées de la Tour Eiffel
        double lat1 = 48.880456923;
        double lon1 = 2.2943506;

        // Coordonnées d'un autre point
        double lat2 = 48.8588443;  // Latitude de la Statue de la Liberté
        double lon2 = 2.324013577; // Longitude de la Statue de la Liberté

        // Calcul de la distance entre la Tour Eiffel et la Statue de la Liberté
        double distance = calculateHaversineDistance(lat1, lon1, lat2, lon2);
        System.out.println("La distance entre les deux points est de : " + distance + " km");
    }
}
