import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {loadDwarves} from '../../../redux/actions/dwarvesActions';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from '../../common/Spinner';
import DwarfItem from '../DwarfItem/DwarfItem';
import './DwarfList.scss';

const DwarfList = ({dwarves, loadDwarves, loading, searchedDwarfName}) => {
  const [page, setPage] = useState(10);
  const [loadedDwarves, setLoadedDwarves] = useState([]);

  const resetLoadedDwarves = () => {
    // If dwarves reloads reset pagination and loaded dwarves
    setPage(10);
    setLoadedDwarves(dwarves.slice(0, page - 1));
  };

  const filterDwarvesByName = () => {
    return dwarves.filter((dwarf: any) => dwarf.name.includes(searchedDwarfName));
  };

  useEffect(() => {
    resetLoadedDwarves();
    if (dwarves.length === 0) {
      loadDwarves().catch((error) => {
        alert('Loading dwarves failed' + error);
      });
    }
  }, [dwarves]);

  useEffect(() => {
    setLoadedDwarves(filterDwarvesByName);

    if (searchedDwarfName.length === 0) {
      resetLoadedDwarves();
    }
  }, [searchedDwarfName]);

  const appendDwarves = () => {
    const PAGINATION = 10;
    const dwarvesSliced = dwarves.slice(page, page + PAGINATION);
    const newDwarvesArray: any = [...loadedDwarves, ...dwarvesSliced];

    setLoadedDwarves(newDwarvesArray);
    setPage(page + PAGINATION);
  };

  const dwarfList = () => {
    if (loadedDwarves && loadedDwarves.length > 0) {
      return (
        <InfiniteScroll
          className="dwarf-list"
          loadMore={appendDwarves}
          hasMore={dwarves.length > loadedDwarves.length}
        >
          {loadedDwarves.map((dwarf) => (
            <DwarfItem key={dwarf['id']} dwarf={dwarf} />
          ))}
        </InfiniteScroll>
      );
    }
  };

  return (
    <>
      {loading && <Spinner />}
      {dwarfList()}
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    dwarves: state.dwarves,
    searchedDwarfName: state.searchedDwarfName,
    loading: state.apiCallsInProgress > 0,
  };
};

const mapDispatchToProps = {
  loadDwarves,
};

export default connect(mapStateToProps, mapDispatchToProps)(DwarfList);