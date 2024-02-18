const sortData = (array, sort, setSort) => {
  if (sort) {
    array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else {
    array.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  setSort(!sort);
  return array;
};

export default sortData;
