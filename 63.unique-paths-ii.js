// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
//
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
//
// 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
//
//
//
// 网格中的障碍物和空位置分别用 1 和 0 来表示。
//
// 说明：m 和 n 的值均不超过 100。
//
// 示例 1:
//
// 输入:
//     [
//         [0,0,0],
//         [0,1,0],
//         [0,0,0]
//     ]
// 输出: 2
// 解释:
//     3x3 网格的正中间有一个障碍物。
// 从左上角到右下角一共有 2 条不同的路径：
// 1. 向右 -> 向右 -> 向下 -> 向下
// 2. 向下 -> 向下 -> 向右 -> 向右
//
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/unique-paths-ii
//     著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstaclesOverTime = function(obstacleGrid) { // 超时了
    if (obstacleGrid.length === 0) {
        return 0;
    }
    if (obstacleGrid[0][0] === 1) {
        return 0;
    }
    const queue = [[0, 0]];
    let count = 1;
    while (queue.length) {
        const temp = queue.shift();
        let tempCount = 0;
        if (obstacleGrid[temp[0] + 1] && (obstacleGrid[temp[0] + 1][temp[1]] === 0)) {
            tempCount++;
            queue.push([temp[0] + 1, temp[1]]);
        }
        if (obstacleGrid[temp[0]][temp[1] + 1] === 0) {
            tempCount++;
            queue.push([temp[0], temp[1] + 1]);
        }

        if (tempCount === 2) {
            count++;
        } else if(tempCount === 0 && !(temp[0] === obstacleGrid.length - 1 && temp[1] === obstacleGrid[0].length - 1)) {
            count--;
        }
    }
    return count;
};

var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    const dp = new Array(m);
    for (let i = 0; i < m; i++) {
        dp[i] = new Array(n).fill(0);
    }
    dp[0][0] = obstacleGrid[0][0] === 0 ? 1 : 0;
    if (dp[0][0] === 0) {
        return 0;
    }
    for (let i = 1; i < m; i++) {
        if (obstacleGrid[i][0] === 0) {
            dp[i][0] = dp[i - 1][0];
        }
    }
    for (let i = 1; i < n; i++) {
        if (obstacleGrid[0][i] === 0) {
            dp[0][i] = dp[0][i - 1];
        }
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 0) dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[m - 1][n - 1];
}

console.log(uniquePathsWithObstacles([[0, 0, 0], [0, 0, 0], [0, 0, 1]]))
