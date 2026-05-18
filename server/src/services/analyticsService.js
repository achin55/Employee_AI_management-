import Employee from '../models/Employee.js';

export const getAnalyticsData = async () => {
  try {
    const totalEmployees = await Employee.countDocuments();

    const averagePerformance =
      (await Employee.aggregate([
        {
          $group: {
            _id: null,
            avg: { $avg: '$performanceScore' },
          },
        },
      ])) || [{ avg: 0 }];

    const departmentStats = await Employee.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 },
          avgPerformance: { $avg: '$performanceScore' },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const topPerformers = await Employee.find()
      .sort({ performanceScore: -1 })
      .limit(5);

    const skillsFrequency = await Employee.aggregate([
      { $unwind: '$skills' },
      {
        $group: {
          _id: '$skills',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const experienceDistribution = await Employee.aggregate([
      {
        $bucket: {
          groupBy: '$experience',
          boundaries: [0, 2, 5, 10, 15, 100],
          default: 'Other',
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    const performanceDistribution = await Employee.aggregate([
      {
        $bucket: {
          groupBy: '$performanceScore',
          boundaries: [0, 20, 40, 60, 80, 100],
          default: 'Other',
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    const ratingStats = await Employee.aggregate([
      {
        $group: {
          _id: null,
          avgTeamwork: { $avg: '$ratings.teamwork' },
          avgCommunication: { $avg: '$ratings.communication' },
          avgProblemSolving: { $avg: '$ratings.problemSolving' },
          avgLeadership: { $avg: '$ratings.leadership' },
          avgTechnical: { $avg: '$ratings.technical' },
        },
      },
    ]);

    return {
      totalEmployees,
      averagePerformance: averagePerformance[0]?.avg || 0,
      departmentStats,
      topPerformers,
      skillsFrequency,
      experienceDistribution,
      performanceDistribution,
      ratingStats: ratingStats[0] || {},
    };
  } catch (error) {
    throw error;
  }
};

export const getDepartmentAnalytics = async (department) => {
  try {
    const employees = await Employee.find({ department });

    const stats = {
      totalEmployees: employees.length,
      averagePerformance:
        employees.reduce((sum, emp) => sum + emp.performanceScore, 0) /
        employees.length,
      topPerformer: employees.sort((a, b) => b.performanceScore - a.performanceScore)[0],
      skillsDistribution: {},
    };

    employees.forEach((emp) => {
      emp.skills.forEach((skill) => {
        stats.skillsDistribution[skill] = (stats.skillsDistribution[skill] || 0) + 1;
      });
    });

    return stats;
  } catch (error) {
    throw error;
  }
};

export const getPerformanceTrends = async () => {
  try {
    const trends = await Employee.aggregate([
      {
        $group: {
          _id: '$department',
          avgScore: { $avg: '$performanceScore' },
          maxScore: { $max: '$performanceScore' },
          minScore: { $min: '$performanceScore' },
          count: { $sum: 1 },
        },
      },
      { $sort: { avgScore: -1 } },
    ]);

    return trends;
  } catch (error) {
    throw error;
  }
};
