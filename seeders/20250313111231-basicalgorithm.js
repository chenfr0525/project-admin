'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('BasicAlgorithms', [
      {
        title: '冒泡排序',
        code: `
          void bubbleSort(int arr[], int n) {
            for (int i = 0; i < n-1; i++) {
              for (int j = 0; j < n-i-1; j++) {
                if (arr[j] > arr[j+1]) {
                  int temp = arr[j];
                  arr[j] = arr[j+1];
                  arr[j+1] = temp;
                }
              }
            }
          }
        `,
        description: '冒泡排序是一种简单的排序算法，通过重复遍历数组，交换相邻的逆序元素，最终实现排序。',
        Type: 'C',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '快速排序',
        code: `
          void quickSort(int arr[], int low, int high) {
            if (low < high) {
              int pi = partition(arr, low, high);
              quickSort(arr, low, pi - 1);
              quickSort(arr, pi + 1, high);
            }
          }
        `,
        description: '快速排序是一种分治算法，通过选择一个基准值，将数组分为两部分，递归排序。',
        Type: 'C',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '二分查找',
        code: `
          int binarySearch(int arr[], int l, int r, int x) {
            while (l <= r) {
              int m = l + (r - l) / 2;
              if (arr[m] == x) return m;
              if (arr[m] < x) l = m + 1;
              else r = m - 1;
            }
            return -1;
          }
        `,
        description: '二分查找用于在有序数组中查找目标值，通过不断缩小搜索范围来提高效率。',
        Type: 'C',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '斐波那契数列',
        code: `
          int fibonacci(int n) {
            if (n <= 1) return n;
            return fibonacci(n - 1) + fibonacci(n - 2);
          }
        `,
        description: '斐波那契数列是一个经典的递归问题，每个数字是前两个数字的和。',
        Type: 'C',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '深度优先搜索',
        code: `
          void DFS(int v, boolean visited[], int adjMatrix[][]) {
            visited[v] = true;
            for (int i = 0; i < adjMatrix.length; i++) {
              if (adjMatrix[v][i] == 1 && !visited[i]) {
                DFS(i, visited, adjMatrix);
              }
            }
          }
        `,
        description: '深度优先搜索是一种用于遍历图或树的算法，通过递归访问每个节点的子节点。',
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '广度优先搜索',
        code: `
          void BFS(int start, boolean visited[], int adjMatrix[][]) {
            Queue<Integer> queue = new LinkedList<>();
            visited[start] = true;
            queue.add(start);
            while (!queue.isEmpty()) {
              int v = queue.poll();
              for (int i = 0; i < adjMatrix.length; i++) {
                if (adjMatrix[v][i] == 1 && !visited[i]) {
                  visited[i] = true;
                  queue.add(i);
                }
              }
            }
          }
        `,
        description: '广度优先搜索是一种用于遍历图或树的算法，通过逐层访问节点。',
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '动态规划 - 背包问题',
        code: `
          int knapsack(int W, int wt[], int val[], int n) {
            int dp[n+1][W+1];
            for (int i = 0; i <= n; i++) {
              for (int w = 0; w <= W; w++) {
                if (i == 0 || w == 0) dp[i][w] = 0;
                else if (wt[i-1] <= w) dp[i][w] = Math.max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);
                else dp[i][w] = dp[i-1][w];
              }
            }
            return dp[n][W];
          }
        `,
        description: '背包问题是动态规划的经典问题，用于在有限的容量内选择物品以最大化价值。',
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '链表反转',
        code: `
          ListNode reverseList(ListNode head) {
            ListNode prev = null;
            ListNode current = head;
            while (current != null) {
              ListNode next = current.next;
              current.next = prev;
              prev = current;
              current = next;
            }
            return prev;
          }
        `,
        description: '链表反转是常见的数据结构操作，通过改变指针方向实现链表反转。',
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '最长公共子序列',
        code: `
          int longestCommonSubsequence(String text1, String text2) {
            int m = text1.length(), n = text2.length();
            int[][] dp = new int[m+1][n+1];
            for (int i = 1; i <= m; i++) {
              for (int j = 1; j <= n; j++) {
                if (text1.charAt(i-1) == text2.charAt(j-1)) dp[i][j] = dp[i-1][j-1] + 1;
                else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
              }
            }
            return dp[m][n];
          }
        `,
        description: '最长公共子序列用于计算两个字符串的最长公共部分，是动态规划的经典应用。',
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: '二叉树遍历',
        code: `
          void inorderTraversal(TreeNode root) {
            if (root == null) return;
            inorderTraversal(root.left);
            System.out.print(root.val + " ");
            inorderTraversal(root.right);
          }
        `,
        description: '二叉树遍历是树结构的基本操作，包括前序、中序和后序遍历。',
        Type: 'Java',
        createdAt:new Date(),
        updatedAt:new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BasicAlgorithms', null, {});
  }
};
