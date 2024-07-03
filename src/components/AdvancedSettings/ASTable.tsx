import React from "react";
import TextField from "@mui/material/TextField";

interface ASTableProps {
  tableData: {
    addInfo: string;
    maxTickets: string | number;
    girlsTickets: string | number;
    guysTickets: string | number;
    promoCodeRequired: boolean;
    visible: boolean;
  };
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const ASTable: React.FC<ASTableProps> = ({ tableData, handleChange }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <TextField
          id="addInfo"
          name="addInfo"
          label="Additional Table information (optional)"
          value={tableData.addInfo}
          onChange={handleChange}
          multiline
          rows={4}
          // variant="filled"
          className="flex-grow rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
        />
      </div>
      <label htmlFor="maxTickets" className="font-medium">
        MAX Tickets
      </label>
      <TextField
        id="maxTickets"
        name="maxTickets"
        label="Maximum tickets per user"
        variant="outlined"
        value={tableData.maxTickets}
        onChange={handleChange}
        className="w-full "
      />
      <label htmlFor="minmaxTickets" className="font-medium">
        MIN Tickets
      </label>
      <div className="grid grid-cols-2 gap-4">
        <TextField
          id="girlsTickets"
          name="girlsTickets"
          label="Minimum tickets per girls"
          variant="outlined"
          value={tableData.girlsTickets}
          onChange={handleChange}
          className="w-full "
        />
        <TextField
          id="guysTickets"
          name="guysTickets"
          value={tableData.guysTickets}
          onChange={handleChange}
          label="Minimum number of guys"
          variant="outlined"
          className="w-full "
        />
      </div>

      <div className="text-lg font-medium">Promo code</div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="promoCodeRequired"
          name="promoCodeRequired"
          checked={tableData.promoCodeRequired}
          onChange={handleChange}
          className="follow rounded mx-0 w-6 h-4"
        />
        <label htmlFor="promoCodeRequired" className="check">
          Prevent customers from purchasing this table without a valid promo
          code
        </label>
      </div>

      <div className="text-lg font-medium">Toggle ticket visibility</div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="visible"
          name="visible"
          checked={tableData.visible}
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

export default ASTable;
