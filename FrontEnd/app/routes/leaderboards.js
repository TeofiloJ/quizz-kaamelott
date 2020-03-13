import Route from '@ember/routing/route';

export default class LeaderBoardRoute extends Route {
  async model() {
    let scoreList = await this.store.query('leaderboard',{
      limit:10
    })
    if(scoreList.length > 0 ){
      return {
        'scoreList': scoreList,
        'topScore': scoreList.firstObject.score
      }
    }else{
      return{
      'scoreList': scoreList,
      'topScore': null
      }
    }
    
    
    // console.log(scoreList.firstObject.score)
    // return {
    //   'scoreList': scoreList,
    //   'topScore': scoreList.firstObject.score
    // }

  }
  
}