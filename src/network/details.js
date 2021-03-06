import { request } from "./request";

export function getGoodsDetails( iid ) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getGoodsRecommend( ) {
  return request({
    url: '/recommend',
  })
}


//封装商品详情打包数据对象类
export class Goods {
  constructor(itemInfo, columns,services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

//封装商家信息类
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodscount = shopInfo.cGoods
  }
}

//封装商品详情参数信息类
export class GoodsParam {
  constructor(info, rule) {
    //注:images可能没有值(某些商品有值，某些没有值)
    this.image = info.images ? info.images[0]: '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

