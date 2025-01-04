module.exports = {

    queryGetAllInterventions:

        "SELECT * FROM intervention;",

    queryGetInterventionById:

        "SELECT * FROM intervention where Id_intervention = ?",

    queryGetInterventionByUser:

        "SELECT * FROM intervention_rdv where Id_user = ?",


}