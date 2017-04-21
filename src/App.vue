<template>
  <router-view></router-view>
</template>

<script>
export default {
}
</script>

<style>
  *, *:after, *:before {
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 14px;
    color: #333;
  }

  a, a:link, a:visited, a:hover, a:active {
    color: inherit;
    text-decoration: none;
  }

  button, input {
    border: none;
    background-color: transparent;
  }

  select {
    appearance: none;    
  }

  .ui-card {
    background: #fff;
    box-shadow: 0px 4px 8px 0px rgba(7,57,101,0.60);
    border-radius: 4px;
    margin: 12px;
  }

  .ui-cell {
    margin: 0 10px;
    border-bottom: 1px solid #e5e5e5;
    min-height: 50px;
    display: flex;
    align-items: center;
  }

  .ui-cell-key {
    flex-shrink: 0;
    margin-left: 6px;
    margin-right: 16px;
    color: #666;
    font-size: 12px;
  }

  .ui-cell-value, .ui-cell-value-link {
    display: block;
    border: none;
    flex-grow: 1;
    text-align: right;
    width: 1px;
  }

  .ui-cell-value-link {
    background: url("assets/ui_cell-link.png") right no-repeat;
    background-size: 2em;
    padding-right: 2em;
  }

  .ui-cell-control, .ui-cell-control-disabled {
    min-height: 32px;
    margin-left: 8px;
    font-size: 12px;
    border-left: 1px solid;
    flex-shrink: 0;
  }

  .ui-cell-control {
    padding: 0 8px;
    border-left-color: #26A2FF;
    color: #26A2FF;
  }

  .ui-cell-control-disabled {
    border-left-color: #999;
    color: #999;
  }

  .ui-btn {
    background: #FFCF35;
    padding: 12px 8px;
  }

  .ui-radio-control {
    position: absolute;
    opacity: 0;
  }

  .ui-radio {
    background: url("assets/ui_radio.png") left no-repeat;
    background-size: 1em;
    padding-left: 1.5em;
    margin-left: 16px;
  }

  .ui-radio-control:checked + .ui-radio {
    background-image: url("assets/ui_radio-checked.png")
  }
</style>
