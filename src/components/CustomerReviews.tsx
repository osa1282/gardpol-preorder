import React from 'react';
import { Star } from 'lucide-react';

const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      name: 'Jan Kowalski',
      rating: 5,
      comment: 'Doskonała jakość materiałów tarasowych. Zniżka na przedsprzedaż była świetną okazją!',
    },
    {
      name: 'Anna Nowak',
      rating: 4,
      comment: 'Bardzo zadowolona z zakupu. Obsługa klienta była na najwyższym poziomie.',
    },
    {
      name: 'Piotr Wiśniewski',
      rating: 5,
      comment: 'Deski kompozytowe przerosły moje oczekiwania. Gorąco polecam!',
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Co mówią nasi klienci</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;