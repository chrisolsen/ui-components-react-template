import { GoARadioGroup, GoARadioItem } from "@abgov/react-components";
import { useState } from "react";

interface Item {
  value: string;
}

const words =
  "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.".split(
    " "
  );

function getWord(): string {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

export const TestsRoute = () => {
  const [items, setItems] = useState<Item[]>([]);

  function addItem() {
    const value = getWord();
    setItems([...items, { value }]);
    // setItems((old) => [...old, { value }]);
  }

  function updateValue(item: Item, index: number, newValue: string) {
    const _item = items[index];
    const newItems = [
      ...items.slice(0, index),
      _item,
      ...items.slice(index + 1, items.length - 1),
    ];
    setItems(newItems);
  }

  return (
    <>
      <h1>Multi Select Test</h1>
      <button onClick={() => addItem()}>Add Item</button>
      {items.map((item: Item, index: number) => (
        <div key={item.value}>
          <div>{item.value}</div>
          <GoARadioGroup
            name={item.value}
            value={item.value}
            onChange={(_: string, value: string) =>
              updateValue(item, index, value)
            }
          >
            <GoARadioItem name={item.value} label="Ascending" value="true" />
            <GoARadioItem name={item.value} label="Descending" value="false" />
          </GoARadioGroup>
        </div>
      ))}
    </>
  );
};

const ItemView = (props: Item) => {
  return <>{props.value}</>;
};
