import { useState } from 'react'
import './App.css'

import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";

interface Option {
  name: string;
  type: number;
  value?: any;
}

const datatype: Option[] = [
  {
    "name": "No Name",
    "type": 3,
    "value": "nisath"
  },
  {
    "name": "ads",
    "type": 3
  },
  {
    "name": "one",
    "type": 1,
    "value": {
      "columns": [
        "hjk",
        "hgjg"
      ],
      "rows": []
    }
  },
  {
    "name": "jhg",
    "type": 2
  },
  {
    "name": "ertyui",
    "type": 3
  },
  {
    "name": "asd",
    "type": 1,
    "value": {
      "columns": [],
      "rows": []
    }
  },
  {
    "name": "adasd",
    "type": 1,
    "value": {
      "columns": [
        "toast"
      ],
      "rows": []
    }
  },
  {
    "name": "new image",
    "type": 3
  },
  {
    "name": "pi table",
    "type": 1,
    "value": {
      "columns": [
        "iii"
      ],
      "rows": []
    }
  },
  {
    "name": "vijay vijay",
    "type": 2
  },
  {
    "name": "No Name",
    "type": 2
  },
  {
    "name": "sam final",
    "type": 1,
    "value": {
      "columns": [
        "sad",
        "adads",
        "adad",
        "adsd"
      ],
      "rows": []
    }
  },
  {
    "name": "sam4",
    "type": 1,
    "value": {
      "columns": [
        "adads",
        "dadad",
        "dasda"
      ],
      "rows": []
    }
  },
  {
    "name": "Personal Details",
    "type": 1,
    "value": {
      "columns": [
        "name",
        "age"
      ],
      "rows": []
    }
  },
  {
    "name": "kbjhjbk",
    "type": 1,
    "value": {
      "columns": [
        "bjkl",
        "jknjn"
      ],
      "rows": []
    }
  },
  {
    "name": "dafs",
    "type": 3
  }
];

// Combine name and type into an object and serialize it into a key string
const createKey = (option: Option): string => {
  const keyObject = { name: option.name, type: option.type };
  return JSON.stringify(keyObject);
};

// Parse the key string back into an object
const parseKey = (key: string): Option | null => {
  try {
    const keyObject = JSON.parse(key);
    if (keyObject && typeof keyObject === "object") {
      const { name, type } = keyObject;
      return { name, type };
    }
  } catch (error) {
    console.error("Error parsing key:", error);
  }
  return null;
};

// Find option by key
const findOptionByKey = (key: string): Option | null => {
  const option = parseKey(key);
  if (option) {
    return (
      datatype.find(
        (item) => item.name === option.name && item.type === option.type
      ) || null
    );
  }
  return null;
};
export default function App() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleMenuItemClick = (option: Option) => {
    setSelectedOption(option);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value as string;
    const option = findOptionByKey(selectedValue);
    setSelectedOption(option);
  };

  return (
    <div>
      <FormControl style={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-label">Choose</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Choose"
          value={selectedOption ? createKey(selectedOption) : ""}
          onChange={handleChange}
          variant="outlined"
        >
          <MenuItem value="">None</MenuItem>
          {datatype.map((option) => (
            <MenuItem
              value={createKey(option)}
              key={createKey(option)}
              onClick={() => handleMenuItemClick(option)}
            >
              {option.name} ({getOptionTypeText(option.type)})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Rest of your component */}
    </div>
  );
}
function getOptionTypeText(type: number): string {
  switch (type) {
    case 1:
      return "Table";
    case 2:
      return "Text";
    case 3:
      return "Image";
    default:
      return "not mentioned";
  }
}