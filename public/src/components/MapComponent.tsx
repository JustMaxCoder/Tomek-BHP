export function MapComponent() {
  return (
    <div className="w-full" data-testid="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.123!2d20.6697!3d52.4328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecb5e8e5e8e5e%3A0x5e5e5e5e5e5e5e5e!2sBohater%C3%B3w%20Modlina%2017%2C%2005-100%20Nowy%20Dw%C3%B3r%20Mazowiecki!5e0!3m2!1spl!2spl!4v1234567890"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa sklepu - Sklep BHP Perfect"
        className="rounded-lg shadow-md"
      />
      <div className="mt-6 text-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg border-2 border-primary/20 shadow-md">
        <p className="font-bold text-2xl mb-3 text-foreground">
          Sklep <span className="text-primary">BHP Perfect</span>
        </p>
        <div className="space-y-1">
          <p className="text-muted-foreground font-medium text-lg">Bohaterów Modlina 17</p>
          <p className="text-muted-foreground font-medium text-lg">05-100 Nowy Dwór Mazowiecki</p>
        </div>
      </div>
    </div>
  );
}
