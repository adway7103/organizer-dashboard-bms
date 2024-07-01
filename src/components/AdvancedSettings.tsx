import React, { useState } from "react";

interface AdvancedSettingsProps {
  initialMinTickets?: number;
  initialMaxTickets?: number;
  initialPromoCodeRequired?: boolean;
  initialIsVisible?: boolean;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = () => {
  const [minTickets, setMinTickets] = useState(1);
  const [maxTickets, setMaxTickets] = useState(10);
  const [promoCodeRequired, setPromoCodeRequired] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleMinTicketsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMinTickets(parseInt(event.target.value));
  };

  const handleMaxTicketsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxTickets(parseInt(event.target.value));
  };

  const handlePromoCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPromoCodeRequired(event.target.checked);
  };

  const handleVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsVisible(event.target.checked);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* <div className="text-xl font-bold">Additional Ticket Information</div> */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="minmaxTickets">MIN and MAX Tickets</label>
        <div className="flex items-center justify-between">
          <label htmlFor="minTickets">Minimum tickets per transaction</label>
          <input
            type="number"
            id="minTickets"
            className="rounded-md border border-gray-600 px-3 py-2"
            value={minTickets}
            onChange={handleMinTicketsChange}
            placeholder="Minimum tickets per transaction"
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="maxTickets">Maximum tickets per user</label>
          <input
            type="number"
            id="maxTickets"
            className="rounded-md border border-gray-600 px-3 py-2"
            value={maxTickets}
            onChange={handleMaxTicketsChange}
            placeholder="Maximum tickets per user"
          />
        </div>
      </div>

      <div className="text-lg font-medium">Promo code</div>
      <div className="flex items-center space-x-2">
        <label htmlFor="promoCode" className="follow">
          <input
            type="checkbox"
            id="promoCode"
            checked={promoCodeRequired}
            onChange={handlePromoCodeChange}
          />
          <span className="ml-2">
            Prevent customers from purchasing this ticket without a valid promo
            code
          </span>
        </label>
      </div>

      <div className="text-lg font-medium">Toggle ticket visibility</div>
      <div className="flex items-center space-x-2">
        <label htmlFor="isVisible" className="follow">
          <input
            type="checkbox"
            id="isVisible"
            checked={isVisible}
            onChange={handleVisibilityChange}
          />
          <span className="ml-2">
            This ticket should be visible on your event page, You can change
            this at any time.
          </span>
        </label>
      </div>
    </div>
  );
};

export default AdvancedSettings;
