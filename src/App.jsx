import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult";
import { IoMdCart } from "react-icons/io";

export const BASE_URL = "https://dish-backend-h4as.onrender.com/";

function App() {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState("");
  const [filterData, setFilterData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("");

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue == "") {
      setFilterData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilterData(filter);
  };

  const onClickCat = (type) => {
    setSelectedBtn(type);
    if (type === "all") {
      setFilterData(data);
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterData(filter);
    setSelectedBtn(type);
  };

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);

      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();

        setData(json);
        setFilterData(json);
        setLoading(false);
      } catch (error) {
        setIsError("Unable to fetch data" + error);
      }
    };

    fetchFoodData();
  }, []);

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "BreakFast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  console.log(data);

  if (loading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <>
      <MainContainer>
        <TopContainer>
          <div>
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <div>
              <input
                type="text"
                onChange={searchFood}
                placeholder="Search Food...."
              />
            </div>
            <div className="cart">
              <IoMdCart />
            </div>
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => onClickCat(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </MainContainer>
      <SearchResult data={filterData} />
    </>
  );
}

export default App;

export const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    display: flex;
    gap: 20px;
    input {
      background-color: transparent;
      border: 1px solid black;
      color: white;
      border-radius: 5px;
      height: 40px;
      outline: 1px solid red;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
    .cart {
      align-self: center;
      font-size: 35px;
    }
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#800b0b" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background: #800b0b;
  }
`;
