function skillsMember() {
  // Path: member.js
  function getSkills() {
    return $http.get('/api/skills');
  }

  // Path: member.js
  function getSkillsByMember(memberId) {
    return $http.get('/api/skills/member/' + memberId);
  }

  // Path: member.js
  function addSkill(skill) {
    return $http.post('/api/skills', skill);
  }

  // Path: member.js
  function updateSkill(skill) {
    return $http.put('/api/skills/' + skill._id, skill);
  }

  // Path: member.js
  function deleteSkill(skillId) {
    return $http.delete('/api/skills/' + skillId);
  }

  return {
    getSkills: getSkills,
    getSkillsByMember: getSkillsByMember,
    addSkill: addSkill,
    updateSkill: updateSkill,
    deleteSkill: deleteSkill
  };
}