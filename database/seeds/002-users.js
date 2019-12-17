exports.seed = function(knex) {
  return knex("users").insert([
    { username: "alberto", password: "pass" },
    { username: "anthony", password: "pass" },
    { username: "michael", password: "pass" },
  ]);
};
