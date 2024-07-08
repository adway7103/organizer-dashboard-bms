import React from "react";
import TextField from "@mui/material/TextField";

interface ASGroupsProps {
  groupData: {
    addInfo: string;
    maxTickets: string | number;
    promoCodeRequired: boolean;
    visible: boolean;
  };
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const ASGroups: React.FC<ASGroupsProps> = ({ groupData, handleChange }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <TextField
            id="addInfo"
            name="addInfo"
            label="Additional group information (optional)"
            value={groupData.addInfo}
            onChange={handleChange}
            multiline
            rows={4}
            // variant="filled"
            className="flex-grow rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="maxTickets" className="font-medium">
          MAX Tickets
        </label>
        <div className="flex items-center justify-between">
          <TextField
            id="maxTickets"
            name="maxTickets"
            label="Maximum tickets per user"
            variant="outlined"
            value={groupData.maxTickets}
            onChange={handleChange}
            className="w-full"
          />
          {/* <input
            type="number"
            id="maxTickets"
            name="maxTickets"
            className="flex-grow rounded-md border border-gray-600 px-3 py-2"
            value={groupData.maxTickets}
            onChange={handleChange}
            placeholder="Maximum tickets per user"
          /> */}
        </div>
      </div>

      <div className="text-lg font-medium">Promo code</div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="promoCodeRequired"
          name="promoCodeRequired"
          checked={groupData.promoCodeRequired}
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
          name="visible"
          checked={groupData.visible}
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

export default ASGroups;
