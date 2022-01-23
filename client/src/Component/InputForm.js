import React, { useState } from "react";
import {
  ContextualMenu,
  IContextualMenuProps,
  IIconProps,
} from "@fluentui/react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { TextField, MaskedTextField } from "@fluentui/react/lib/TextField";
import {
  Stack,
  IStackProps,
  IStackStyles,
  ITextFieldStyles,
} from "@fluentui/react/lib/Stack";
import { getTheme, Slider } from "@fluentui/react";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const options: IDropdownOption[] = [
  { key: "canada", text: "Canada" },
  { key: "germany", text: "Germany" },
  { key: "India", text: "India" },
];

const narrowTextFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 100 },
};

import "../App.css";

const theme = getTheme();

const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: "Calendar" };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const InputForm = () => {
  const [title, setTitle] = useState("");
  const titleOnChange = (value: text) => setTitle(value);

  const [cases, setCases] = React.useState("");
  const casesOnChange = (value: number) => setCases(value);

  const [deaths, setDeaths] = React.useState("");
  const deathsOnChange = (value: number) => setDeaths(value);

  const [reproduction, setReproduction] = React.useState(0);
  const reproductionOnChange = (value: number) => setReproduction(value);

  const [positive, setPositive] = React.useState(0);
  const positiveOnChange = (value: number) => setPositive(value);

  const [icu, setIcu] = React.useState("");
  const icuOnChange = (value: number) => setIcu(value);

  const [hosp, setHosp] = React.useState("");
  const hospOnChange = (value: number) => setHosp(value);

  const [testper, setTestper] = React.useState(0);
  const testperOnChange = (value: number) => setTestper(value);

  const [tvac, setTvac] = React.useState(0);
  const tvacOnChange = (value: number) => setTvac(value);

  const [totalvacpeople, setTotalvacpeople] = React.useState(0);
  const totalvacpeopleOnChange = (value: number) => setTotalvacpeople(value);

  const [fullyvac, setFullyvac] = React.useState(0);
  const fullyvacOnChange = (value: number) => setFullyvac(value);

  const [booster, setBooster] = React.useState(0);
  const boosterOnChange = (value: number) => setBooster(value);

  const [newvac, setNewvac] = React.useState(0);
  const newvacOnChange = (value: number) => setNewvac(value);

  const [newvacpeople, setNewvacpeople] = React.useState(0);
  const newvacpeopleOnChange = (value: number) => setNewvacpeople(value);

  return (
    <div className="center">
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
          {/* <TextField
            placeholder="En"
            label="Required "
            required
            onChange={(e) => setTitle(e.target.value)}
          /> */}
          <Dropdown
            placeholder="Select a country"
            label="Select a country"
            options={options}
            styles={dropdownStyles}
            onChange={(e, selectedOption) => {
              setTitle(selectedOption);
            }}
          />
          <Slider
            label="Estimate the number of cases:"
            min={0}
            max={100000}
            step={100}
            defaultValue={10000}
            showValue
            snapToStep
            onChange={casesOnChange}
          />
          <Slider
            label="Estimate the number of deaths:"
            min={0}
            max={10000}
            step={100}
            defaultValue={5000}
            showValue
            snapToStep
            onChange={deathsOnChange}
          />
          <Slider
            label="Estimate the reproduction rate:"
            min={0}
            max={3}
            step={0.1}
            defaultValue={0.8}
            showValue
            snapToStep
            onChange={reproductionOnChange}
          />
          <Slider
            label="Estimate the positivity rate:"
            min={0}
            max={1}
            step={0.05}
            defaultValue={0.2}
            showValue
            snapToStep
            onChange={positiveOnChange}
          />
          <Slider
            label="Estimate the number of ICU patients:"
            min={0}
            max={10000}
            step={100}
            defaultValue={2000}
            showValue
            snapToStep
            onChange={icuOnChange}
          />
          <Slider
            label="Estimate the number of hospitalizations:"
            min={0}
            max={20000}
            step={100}
            defaultValue={2000}
            showValue
            snapToStep
            onChange={hospOnChange}
          />
          <Slider
            label="Estimate the number of ICU patients:"
            min={0}
            max={10000}
            step={100}
            defaultValue={2000}
            showValue
            snapToStep
            onChange={icuOnChange}
          />
          <Slider
            label="How many people are being tested per confirmed case?"
            min={0}
            max={120}
            step={10}
            defaultValue={30}
            showValue
            snapToStep
            onChange={testperOnChange}
          />
          <Slider
            label="Estimate the total number of vaccines delivered:"
            min={0}
            max={5000000000}
            step={100000}
            defaultValue={40000000}
            showValue
            snapToStep
            onChange={tvacOnChange}
          />
          <Slider
            label="Estimate the total number of vaccinated individuals:"
            min={0}
            max={1000000000}
            step={10000}
            defaultValue={40000000}
            showValue
            snapToStep
            onChange={totalvacpeopleOnChange}
          />
          <Slider
            label="Estimate the total number of fully vaccinated people:"
            min={0}
            max={1000000000}
            step={10000}
            defaultValue={40000000}
            showValue
            snapToStep
            onChange={fullyvacOnChange}
          />
          <Slider
            label="Estimate the total number of people who have received the booster dose:"
            min={0}
            max={1000000000}
            step={10000}
            defaultValue={40000000}
            showValue
            snapToStep
            onChange={boosterOnChange}
          />
          <Slider
            label="Estimate the total number of new vaccines delivered:"
            min={0}
            max={5000000000}
            step={10000}
            defaultValue={40000000}
            showValue
            snapToStep
            onChange={newvacOnChange}
          />
          <Slider
            label="Estimate the total number of new vaccinated individuals:"
            min={0}
            max={1000000000}
            step={10000}
            defaultValue={40000000}
            showValue
            snapToStep
            onChange={newvacpeopleOnChange}
          />

          <DefaultButton
            onClick={async () => {
              const query = {
                title,
                cases,
                deaths,
                reproduction,
                positive,
                icu,
                hosp,
                testper,
                tvac,
                totalvacpeople,
                fullyvac,
                booster,
                newvac,
                newvacpeople,
              };
              const response = await fetch("http://localhost:5000/input", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(query),
              });

              console.log(query.title);

              if (response.ok) {
                console.log("response worked!");
              }
              window.location.reload(false);
            }}
          >
            submit
          </DefaultButton>
        </Stack>
      </Stack>
    </div>
  );
};
