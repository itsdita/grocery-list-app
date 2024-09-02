import { useState } from "react";
import { handleDeleteItem, handleDeleteCategory } from "../util/handleDelete";
import { handleCheck } from "../util/handleCheck";
import GroceriesManagement from "./GroceriesManagement";

const Groceries = ({ updateList, setGroceries, groceries, list }) => {
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <article className="grocery-list">
      <h2>Groceries</h2>
      {/* iterating over all objects in GROCERIES array
      group is category */}
      <div className="grocery-list-container">
        {Object.keys(groceries).map((category, index) => (
          <div key={index} className="category-container">
            {/* accessing the key that holds the name of the category */}
            <h3 onClick={() => toggleCategory(category)}>{category}</h3>
            {showDeleteCategory && (
              <button
                className="delete-icon"
                onClick={() =>
                  handleDeleteCategory(category, setGroceries, updateList)
                }
              >
                x
              </button>
            )}
            {expandedCategories[category] && (
              <ul className="grocery-list">
                {/* iterating over array of items in a category */}
                {groceries[category].map((item, i) => (
                  <li key={i}>
                    <input
                      /* passing the event and the category name to handleCheck function */
                      onChange={(e) => handleCheck(e, category, item, updateList)}
                      type="checkbox"
                      checked={
                        (list[category] && list[category][item]) || false
                      }
                      value={item}
                    />
                    {item}
                    {showDeleteItem && (
                      <button
                        className="delete-icon"
                        onClick={() =>
                          handleDeleteItem(
                            category,
                            item,
                            setGroceries,
                            updateList
                          )
                        }
                      >
                        x
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <GroceriesManagement
          groceries={groceries}
          showDeleteCategory={showDeleteCategory}
          showDeleteItem={showDeleteItem}
          setShowDeleteCategory={setShowDeleteCategory}
          setShowDeleteItem={setShowDeleteItem}
        />
      </div>
    </article>
  );
};

export default Groceries;
