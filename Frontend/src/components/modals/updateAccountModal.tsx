import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Form, InputNumber } from "rsuite";
import { CreateAccountUIModel, UpdateAccountModel } from "@/types/models";
import { TypeAttributes } from "rsuite/esm/@types/common";
import { updateAccountThunk } from "@/store/thunks/account/accountThunk";
import useJwtToken from "../../hooks/useJwtToken";
import { AppDispatch } from "../../store/store";
import ModalWrapper from "./modalWrapper";

interface CreateCardModal {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  id: string;
}

const NumberInput = React.forwardRef((props, ref) => <InputNumber {...props} ref={ref} />);

function UpdateAccountModal({ setIsOpen, isOpen, id }: CreateCardModal) {
  const [accountModel, setAccountModel] = useState<Partial<UpdateAccountModel>>({
    balance: 0,
    name: "",
    id,
  });

  useEffect(() => {
    setAccountModel((prev) => ({ ...prev, id }));
  }, [id]);

  const [activeColor, setActiveColor] = useState<TypeAttributes.Color>("blue");
  const [activeIcon, setActiveIcon] = useState<string>("");

  const onChangeIcon = (color: TypeAttributes.Color, icon: string) => {
    setAccountModel((prev) => ({ ...prev, iconColor: color, iconName: icon }));
  };

  const dispatch: AppDispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { decodeToken } = useJwtToken();

  const updateModel = (value: string | number, property: keyof CreateAccountUIModel) => {
    if (property === "name") {
      if (value.toString().length > 40) {
        return;
      }
    }

    if (property === "balance") {
      if (value.toString().length > 6) {
        return;
      }
    }
    setAccountModel((prevstate) => ({ ...prevstate, [property]: value }));
  };

  const handleSucc = () => {
    setLoading(true);

    if (accountModel) {
      dispatch(updateAccountThunk(accountModel as UpdateAccountModel));
    }
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <div>
      <ModalWrapper
        title="Изменить"
        open={isOpen}
        backdrop="static"
        handleClose={() => setIsOpen(false)}
        handleProceed={handleSucc}
        cancelLabel="Назад"
        okLabel="Добавить"
        size="xs"
      >
        <div className="w-full p-2">
          <Form fluid>
            <Form.Group controlId="name-1">
              <Form.ControlLabel>Название счета</Form.ControlLabel>
              <Form.Control name="name" onChange={(e) => updateModel(e, "name")} />
            </Form.Group>
            <div className="flex gap-3">
              <div className="flex flex-grow">
                <Form.Group>
                  <Form.ControlLabel>Текущий баланс</Form.ControlLabel>
                  <Form.Control
                    className="flex flex-grow"
                    name="numder"
                    accepter={InputNumber}
                    onChange={(e) => updateModel(e, "balance")}
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default UpdateAccountModal;
