import { AccountModel } from "@/types/models";
import React from "react";
import { RadioGroup, Radio } from "rsuite";

interface AccountPickerProps {
  activeAccount: AccountModel?;
  allAccounts: AccountModel[];
  setActiveAccount: (e: string) => void;
}

function AccountPicker({ activeAccount, allAccounts, setActiveAccount }: AccountPickerProps) {
  return (
    <div className="m-1 items-center justify-center  p-1 ">
      <RadioGroup
        name="radioList"
        inline
        appearance="picker"
        value={activeAccount?.id}
        onChange={(e) => setActiveAccount(e)}
      >
        {allAccounts.map((item) => (
          <Radio value={item.id}>{item.name}</Radio>
        ))}
      </RadioGroup>
    </div>
  );
}

export default AccountPicker;
