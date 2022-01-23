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
  { key: "belgium", text: "Belgium" },
  { key: "bulgaria", text: "Bulgaria" },
  { key: "cyprus", text: "Cyprus" },
  { key: "czechia", text: "Czechia" },
  { key: "denmark", text: "Denmark" },
  { key: "estonia", text: "Estonia" },
  { key: "finland", text: "Finland" },
  { key: "france", text: "France" },
  { key: "ireland", text: "Ireland" },
  { key: "italy", text: "Italy" },
  { key: "luxembourg", text: "Luxembourg" },
  { key: "malta", text: "Malta" },
  { key: "netherlands", text: "Netherlands" },
  { key: "portugal", text: "Portugal" },
  { key: "serbia", text: "Serbia" },
  { key: "slovakia", text: "Slovakia" },
  { key: "slovenia", text: "Slovenia" },
  { key: "spain", text: "Spain" },
  { key: "switzerland", text: "Switzerland" },
  { key: "unitedkingdom", text: "United Kingdom" },
  { key: "australia", text: "Autralia" },
  { key: "newzealand", text: "New Zealand" },
  { key: "canada", text: "Canada" },
  { key: "unitedstates", text: "United States" },
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
            placeholder="Default: Canada"
            label="Select a country"
            options={options}
            styles={dropdownStyles}
            onChange={(e, selectedOption) => {
              setTitle(selectedOption);
            }}
          />
          <Slider
            label="Number of cases:"
            min={0}
            max={1500000}
            step={1000}
            defaultValue={800}
            showValue
            snapToStep
            onChange={casesOnChange}
          />
          <Slider
            label="Number of deaths:"
            min={0}
            max={5000}
            step={10}
            defaultValue={100}
            showValue
            snapToStep
            onChange={deathsOnChange}
          />
          <Slider
            label="Estimate the reproduction rate:"
            min={0}
            max={4}
            step={0.1}
            defaultValue={1.1}
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
            label="Number of ICU patients:"
            min={0}
            max={30000}
            step={100}
            defaultValue={200}
            showValue
            snapToStep
            onChange={icuOnChange}
          />
          <Slider
            label="Number of hospitalizations:"
            min={0}
            max={200000}
            step={1000}
            defaultValue={1000}
            showValue
            snapToStep
            onChange={hospOnChange}
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
            label="Total number of vaccines delivered:"
            min={0}
            max={500000000}
            step={100000}
            defaultValue={500000}
            showValue
            snapToStep
            onChange={tvacOnChange}
          />
          <Slider
            label="Total number of vaccinated individuals:"
            min={0}
            max={250000000}
            step={100000}
            defaultValue={200000}
            showValue
            snapToStep
            onChange={totalvacpeopleOnChange}
          />
          <Slider
            label="Total number of fully vaccinated people:"
            min={0}
            max={400000}
            step={100000}
            defaultValue={40000000}
            showValue
            snapToStep
            onChange={fullyvacOnChange}
          />
          <Slider
            label="Total number of people who have received the booster dose:"
            min={0}
            max={10000000}
            step={10000}
            defaultValue={30000}
            showValue
            snapToStep
            onChange={boosterOnChange}
          />
          <Slider
            label="Total number of new vaccines delivered:"
            min={0}
            max={350000}
            step={1000}
            defaultValue={5000}
            showValue
            snapToStep
            onChange={newvacOnChange}
          />
          <Slider
            label="Total number of new vaccinated individuals:"
            min={0}
            max={200000}
            step={1000}
            defaultValue={2000}
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
                icu,
                hosp,
                positive,
                testper,
                tvac,
                totalvacpeople,
                fullyvac,
                booster,
                newvac,
                newvacpeople,
              };
              const response = await fetch(
                "https://mchacks9-csip.herokuapp.com/input",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(query),
                }
              );

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
