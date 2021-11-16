const EchartsPlugin = (md) => {
  const tokenInfo = {
    ECHARTS: 'echarts',
  }
  const temp = md
    .renderer
    .rules
    .fence
    .bind(md.renderer.rules);
  if (Object.freeze) {
    Object.freeze(tokenInfo);
  }
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const code = token
      .content
      .trim();
    if (Object.keys(tokenInfo).some((key) => token.info === tokenInfo[key])) {
      try {
        const json = JSON.parse(code);
        switch (token.info) {
          case tokenInfo.ECHARTS:
            let chartWidth = json.width || 500;
            let chartHeight = json.height || 400;
            return `
            <div class="echarts-holder" style="width:${chartWidth}px;height:${chartHeight}px">
              <div class="echarts"></div>
              <div class="echarts-data" style="display:none">${JSON.stringify(json)}</div>
            </div>
            `
            break;
          default:
            break;
        }
      } catch (err) {
        return `<pre>${err}</pre>`
      }
    }
    return temp(tokens, idx, options, env, slf)
  }
}

module.exports = EchartsPlugin;
