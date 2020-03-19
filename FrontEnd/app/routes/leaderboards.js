import Route from '@ember/routing/route';

export default class LeaderBoardRoute extends Route {
  async model(params) {
    let newScore = ''
    if (params.name != undefined && params.score != undefined) {
      // debugger
      newScore = await this.store.createRecord('leaderboard', {
        name: params.name,
        score: params.score
      })
      await newScore.save()
    }

    let res;

    let scoreList = await this.store.query('leaderboard', {
      limit: 10
    })
    if (scoreList.length > 0) {
      res = {
        'newScore': '',
        'scoreList': scoreList,
        'topScore': scoreList.firstObject.score
      }

    } else {
      res = {
        'newScore': '',
        'scoreList': scoreList,
        'topScore': null
      }
    }

    if (params.name != undefined && params.score != undefined) {
      res['newScore'] = newScore
    }

    return res;


    // console.log(scoreList.firstObject.score)
    // return {
    //   'scoreList': scoreList,
    //   'topScore': scoreList.firstObject.score
    // }

  }

}