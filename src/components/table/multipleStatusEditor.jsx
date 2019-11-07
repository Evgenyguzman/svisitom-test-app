import React from 'react'

import styled from 'styled-components'

const Styles = styled.div`
  padding: 1rem;

  div{
    width: 50%;
    margin: auto;
    padding: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    background-color: #e7e7e7;
    border-radius: 15px;
  }

  span{
    width: 100%
  }

  input{
    margin: 5px
    font-size: 20px
    padding: 5px 20px
  }

  button{
    margin: 5px
    font-size: 18px
    padding: 5px 25px
  }

`

export const MultipleStatusEditor = ({updateMyData, selectedRowPaths})=>{
  let [value, setValue] = React.useState('')
  function declOfNum(number, titles) {  
    const cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
  }
  const count =  selectedRowPaths.length
  return (
    <Styles>
      <div>
        <span>{`Выбрано ${count} ${declOfNum(count, ['запись', 'записи', 'записей'])}. Введите нужное значение:`}</span>
        <input type="text" value={value} onChange={ (e)=>{setValue(e.target.value) }}  />
        <button onClick={()=>{
          updateMyData(selectedRowPaths.map(id=>parseInt(id)), 'status', value)
        }}>
          ОК
        </button>
      </div>
    </Styles>
  )
}