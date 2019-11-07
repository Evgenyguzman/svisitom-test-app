import React from 'react'

import styled from 'styled-components'
import { useTable, useSortBy, useRowSelect } from 'react-table'

import { EditableCell } from './editableCell'
import { MultipleStatusEditor } from './multipleStatusEditor'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }
`

function DataTable({ columns, data, updateMyData, disablePageResetOnDataChange }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowPaths },
  } = useTable(
    {
      columns,
      data,
      updateMyData,
    },
    useSortBy,
    useRowSelect
  )

  const firstPageRows = rows.slice(0, 20)

  return (
    <React.Fragment>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
          {
            (selectedRowPaths.length > 0)
            ?
              <MultipleStatusEditor updateMyData={updateMyData} selectedRowPaths={selectedRowPaths} />
            :
              null
          }
        </div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map(
              (row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )}
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export function Table({items, onUpdateData}) {
  const columns = React.useMemo(
    () => [
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      {
        Header: 'Id',
        accessor: 'id'
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: EditableCell
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  )

  const data = items
  
  // const [originalData] = React.useState(data)
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const updateMyData = (rowIndexes, columnID, value) => {

    setSkipPageReset(true)
    
    const newData = data.map((row, index) => {
      if (rowIndexes.includes(index)) {
        return {
          ...data[index],
          [columnID]: value,
        }
      }
      return row
    })

    onUpdateData(newData)

  }

  // const resetData = () => onUpdateData(originalData)

  return (
    <Styles>
      {/* <button onClick={resetData}>Reset Data</button> */}
      <DataTable 
        columns={columns} 
        data={data} 
        updateMyData={updateMyData}
        disablePageResetOnDataChange={skipPageReset}
      />
    </Styles>
  )
}

