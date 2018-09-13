
/**
 * 生成随机ID
 */
let makeId = function() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

let getTextWidth = function(text) {
  let i = text.length
  let width = 0
  while(i) {
    let char = text.charAt(i - 1)
    if(char.charCodeAt() > 126) {
      width += 13
    } else {
      width += 9
    }
    i--
  }
  return width
}

const getGroups = function(obj) {
  const groups = [];
  Object.keys(obj).forEach(key => {
    const childs=obj[key];
    childs&&childs.forEach(v => {
      if(isPlugin(v)){
        const metadate=v.metadata;
        const groupKey = metadate["spring.application.group.key"];
        if(groupKey){
          const group = metadate[groupKey];
          if (groups.indexOf(group) == -1) {
            groups.push(group);
          }
        }
      }
    });
  });
  return groups;
}

const filterGroups = function(obj,group) {
  let data = {};
  if (group && group !== '') {
    Object.keys(obj).forEach(key => {
      const childs = obj[key].filter(child => {
        if(isPlugin(v)) {
          const metadate = child.metadata;
          const groupKey = metadate["spring.application.group.key"];
          if (groupKey) {
            const groupVal = metadate[groupKey];
            return groupVal === group;
          }
        }
      });
      if (childs.length > 0) {
        data[key] = childs;
      }
    });
    return data;
  } else {
    return obj;
  }
}

const isPlugin = function(obj) {
  const metadate = obj.metadata || {};
  return Object.keys(metadate).indexOf("spring.application.discovery.plugin") > -1;
}

const getPluginService = function(obj, without) {
  let data = [];
  Object.keys(obj).forEach(key => {
    if(key!==without){
      const childs = obj[key].find(child => isPlugin(child));
      if (childs) {
        data.push(key);
      }
    }
  });
  return data;
}

const convRoutes = function(obj) {
  const json = JSON.parse(JSON.stringify(obj).replace(/nexts/g, "children"));
  return json;
}

export { makeId, getTextWidth, getGroups, filterGroups, isPlugin, getPluginService, convRoutes }
