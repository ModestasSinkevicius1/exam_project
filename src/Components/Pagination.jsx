import { useContext } from "react";
import DataContext from "../Context/DataContext.jsx";

function Pagination(){

  const { ordersCount, setCurrentPage, currentPage } = useContext(DataContext);

  const pageInterval = 2;

  let orderRows = 0;

  const maxPage = () => {
    return Math.ceil(orderRows/10);
  }

  const sliceOrders = (pageNum) =>{
    if(pageNum <= pageCount.length && pageNum > 0)
      setCurrentPage(pageNum);
    return;
  }

  if(ordersCount){
    orderRows = ordersCount[0].ordersRows; 
  }

  const pageCount = orderRows ? [...Array(maxPage())] : [];

  return (
    <div className="pagination">
      <span className="pagination-arrow-back" onClick={() => sliceOrders(currentPage - 1)}>{"<"}</span>
      <span
        className={currentPage === 1 ? "page active" : "page"}
        onClick={() => sliceOrders(1)}
      >
        1
      </span>
      {currentPage > pageInterval + 1 ? <span>...</span> : null}
      {pageCount.map((_, i) =>
        i + 1 !== 1 &&
        i + 1 < pageInterval + currentPage &&
        i + 1 > currentPage - pageInterval ? (
          <span
            className={currentPage === i + 1 ? "page active" : "page"}
            key={i}
            onClick={() => sliceOrders(i + 1)}
          >
            {i + 1}
          </span>
        ) : null
      )}
      {currentPage < maxPage() - pageInterval ? <span>...</span> : null}
      {currentPage + pageInterval <= maxPage() ? <span
        className={currentPage === maxPage() ? "page active" : "page"}
        onClick={() => sliceOrders(maxPage())}
      >
        {maxPage()}
      </span>
      : null}
      <span className="pagination-arrow-front" onClick={() => sliceOrders(currentPage + 1)}>{">"}</span>
    </div>
  );
}

export default Pagination;