import React from "react";
import TextField from "@mui/material/TextField";

interface ASIndividualProps {
  formData: {
    additionalInfo: string;
    minPersonAllowedPerBooking: string | number;
    maxPersonAllowedPerBooking: string | number;
    promoCode: boolean;
    toggleVisibility: boolean;
  };
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const ASIndividual: React.FC<ASIndividualProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <TextField
          id="addInfo"
          name="additionalInfo"
          label="Additional Ticket information (optional)"
          value={formData.additionalInfo}
          onChange={handleChange}
          multiline
          rows={4}
          // variant="filled"
          className="flex-grow rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
        />
      </div>
      <label htmlFor="minmaxTickets" className="font-medium">
        MIN and MAX Tickets
      </label>
      <div className="grid grid-cols-2 gap-4">
        <TextField
          id="minTickets"
          name="minPersonAllowedPerBooking"
          label="Minimum tickets per user"
          variant="outlined"
          type="number"
          value={formData.minPersonAllowedPerBooking}
          onChange={handleChange}
          className="w-full"
          sx={{
            "& .MuiInputBase-root": {
              height: "56px", // Adjust height as needed
            },
            "& .MuiOutlinedInput-input": {
              padding: "16px", // Adjust padding as needed
            },
          }}
        />
        <TextField
          id="maxTickets"
          name="maxPersonAllowedPerBooking"
          value={formData.maxPersonAllowedPerBooking}
          onChange={handleChange}
          label="Maximum tickets per user"
          variant="outlined"
          type="number"
          className="w-full"
          sx={{
            "& .MuiInputBase-root": {
              height: "56px", // Adjust height as needed
            },
            "& .MuiOutlinedInput-input": {
              padding: "16px", // Adjust padding as needed
            },
          }}
        />
      </div>

      <div className="text-lg font-medium">Promo code</div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="promoCodeRequired"
          name="promoCode"
          checked={formData.promoCode}
          onChange={handleChange}
          className="follow rounded mx-0 w-6 h-4"
        />
        <label htmlFor="promoCodeRequired" className="check">
          Prevent customers from purchasing this ticket without a valid promo
          code
        </label>
      </div>

      <div className="text-lg font-medium">Toggle ticket visibility</div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="visible"
          name="toggleVisibility"
          checked={formData.toggleVisibility}
          onChange={handleChange}
          className="follow rounded mx-0 w-6 h-4"
        />
        <label htmlFor="visible" className="check">
          This ticket should be visible on your event page. You can change this
          at any time.
        </label>
      </div>
    </div>
  );
};

export default ASIndividual;
