<template>
  <div class="container">
    <div class="row">
        <div class="col s12 l4 offset-l4 xl4 offset-xl4">
            <div class="card-panel  blue-grey lighten-3 right-align screen">
                <input v-model="expression" id="password" name="password" type="text" class="validate" />
            </div>
            <div class="buttons">
                <div class="col s3"><button type="button" class="waves-effect waves-light btn back-color" @click="enterNum(1)">1</button></div>
                <div class="col s3"><button type="button" class="waves-effect waves-light btn back-color" @click="enterNum(2)">2</button></div>
                <div class="col s3"><button type="button" class="waves-effect waves-light btn back-color" @click="enterNum(3)">3</button></div>
                <div class="col s3"><button type="button" class="waves-effect waves-light orange-back-color btn" @click="enterSymbol('/')">&divide;</button></div>

                <div class="col s3"><button type="button" class="waves-effect waves-light btn back-color" @click="enterNum(4)">4</button></div>
                <div class="col s3"><button type="button" class="waves-effect waves-light btn back-color" @click="enterNum(5)">5</button></div>
                <div class="col s3"><button type="button" class="waves-effect waves-light btn back-color" @click="enterNum(6)">6</button></div>
                <div class="col s3"><button type="button" class="waves-effect waves-light orange-back-color btn" @click="enterSymbol('*')">*</button></div>

                <div class="col s3"><button type="button" class="waves-effect waves-light btn back-color" @click="enterNum(7)">7</button></div>
                <div class="col s3"><button type="button" class="waves-effect waves-light btn back-color" @click="enterNum(8)">8</button></div>
                <div class="col s3"><button type="button" class="waves-effect waves-light btn back-color" @click="enterNum(9)">9</button></div>
                <div class="col s3"><button type="button" class="waves-effect waves-light orange-back-color btn" @click="enterSymbol('-')">-</button></div>


                <div class="col s9"><button type="button" class="waves-effect waves-light btn btn-special back-color" @click="clearAll()">C</button></div>
                <div class="col s3"><button type="button" class="waves-effect waves-light orange-back-color btn" @click="enterSymbol('+')">+</button></div>

                <div class="col s9"><button type="button" class="waves-effect waves-light btn btn-special back-color" @click="enterNum(0)">0</button></div>
                <div class="col s3"><button type="button" class="waves-effect waves-light orange-back-color btn back-color" @click="equal()">=</button></div>

            </div>
        </div>
    </div>
    <div class='raw'>
        <table>
        <thead>
          <tr>
              <th>Operation name</th>
              <th>Expression</th>
              <th>Result</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in operations" :key="item.id">
            <td>{{item.type}}</td>
            <td>{{item.expression}} {{operation_keys[item[0]]}} {{item[2]}}</td>
            <td>{{item.result}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
</template>

<script>
    import ApiService from '../services/api.service';

    export default {
        name: 'HelloWorld',
        data(){
            return{
                expression: '0',
                symbol: false,
                operations: [],
                operation_keys: {
                    add: '+',
                    sub: '-',
                    mul: '*',
                    div: '/'
                }
            }
        },
        methods:{
            enterNum(num){
                console.log(this.expression)
                if(this.expression == '0'){
                    this.expression = num.toString();
                }else{
                    this.expression += num.toString();
                }
            },

            clearAll(){
                this.expression = '0';
            },

            async fetchData(){
                const qRes = await ApiService.post('operations', {}, {withCredentials: true});
                this.operations = qRes.data.operations;
            },

            async equal(){
                const qRes = await ApiService.post('calculate/execute', {expression:this.expression}, {withCredentials: true});
                this.expression = `${this.expression} = ${qRes.data.result.result}`;
                this.operations.push(qRes.data.result)
            },

            enterSymbol(symbol){
                this.expression += ` ${symbol} `
                this.symbol = true;
            }
        },
        mounted(){
            this.fetchData();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    margin-top: 20vh;
    font-family: 'Inknut Antiqua', Roboto, serif;
    font-size: 1em;
    font-weight: normal;
}
.back-color{
    background-color: #0f583d;
}
.orange-back-color{
    background-color: #f17423;
}
.screen {
    height: 120px;
}
.result {
    font-size: 2em;
    margin-top: 10em;
}
.btn{
    float: left;
    height: 80px;
    font-size: 1.2em;
    border: 1px solid;
    width: 5.4vw;
    margin-left: -0.6vw;
}
.btn-special {
    width: 15.9vw;
}

/*置底页脚*/
body {
    display: flex;
    min-height: 80vh;
    flex-direction: column;
}

main {
    flex: 1 0 auto;
}

@media (max-width: 600px){
    body {
        margin-top: 2vh;
    }
    .btn {
        width:21vw;
        margin-left: -2vw;
    }
    .btn-special {
        width: 43.5vw;
    }
}
</style>
