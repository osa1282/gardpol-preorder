#!/bin/bash

# Pobierz nowy kod z GitHub
echo "Pobieranie nowego kodu z GitHub..."
git pull
if [ $? -ne 0 ]; then
    echo "Błąd: Nie udało się pobrać kodu."
    exit 1
fi

# Buduj aplikację
echo "Budowanie aplikacji..."
npm run build
if [ $? -ne 0 ]; then
    echo "Błąd: Nie udało się zbudować aplikacji."
    exit 1
fi

# Restartuj serwer nginx
echo "Restartowanie serwera nginx..."
sudo systemctl restart nginx
if [ $? -ne 0 ]; then
    echo "Błąd: Nie udało się zrestartować serwera nginx."
    exit 1
fi

echo "Proces wdrożenia zakończony pomyślnie!"
