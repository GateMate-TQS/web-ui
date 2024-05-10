function PurchaseForm() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="ccNumber" className="text-sm font-semibold">
            CC Number
          </label>
          <input
            id="ccNumber"
            name="ccNumber"
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="cardType" className="text-sm font-semibold">
            Card Type
          </label>
          <select
            name="cardType"
            id="cardType"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            style={{ appearance: "none" }}
          >
            <option value="">Select Card Type</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="amex">American Express</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="creditCardNumber" className="text-sm font-semibold">
            Credit Card Number
          </label>
          <input
            id="creditCardNumber"
            name="creditCardNumber"
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="month" className="text-sm font-semibold">
            Month
          </label>
          <input
            id="month"
            name="month"
            type="number"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="year" className="text-sm font-semibold">
            Year
          </label>
          <input
            id="year"
            name="year"
            type="number"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="nameOnCard" className="text-sm font-semibold">
            Name on Card
          </label>
          <input
            id="nameOnCard"
            name="nameOnCard"
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </form>
    </div>
  );
}

export default PurchaseForm;
