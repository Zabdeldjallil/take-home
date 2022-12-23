export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue(){
    for (let index = 0; index < this.drugs.length; index++) {
      //benefit is never bigger than 50
      if(this.drugs[index].benefit>50){
        throw new Error("can't be more than 50")
      }
      //magic pill never expires nor decrease in benefit

    if(this.drugs[index].name!=="Magic Pill"){
        //benefit is never negative
        //once the expiaration date passed it decreases twice as fast
        if(this.drugs[index].expiresIn<=0){
        if(this.drugs[index].name!=="Fervex"){
            //if it's herbal tea it should increase in benefits
            if(this.drugs[index].name!=="Herbal Tea"){
              this.drugs[index].benefit=this.drugs[index].benefit-2 >= 0 ? this.drugs[index].benefit-2 :0
            }else{
              this.drugs[index].benefit=this.drugs[index].benefit + 2 < 50 ? this.drugs[index].benefit+2 :50
            }
          }else{
            if(this.drugs[index].name==="Dafalgan"){
              this.drugs[index].benefit=this.drugs[index].benefit-4 >0 ? this.drugs[index].benefit-4:0
            }else{
            //put benefit to 0 when it's fervex
                  this.drugs[index].benefit=0
            }
          }
        }else{
          if(this.drugs[index].name!=="Herbal Tea"&&this.drugs[index].name!=="Fervex"&&this.drugs[index].name!=="Dafalgan"){
            this.drugs[index].benefit=this.drugs[index].benefit-1 >= 0 ?this.drugs[index].benefit-1:0
          }else{

            //if Fervex expiresIn more than 10 days it's benefit keeps increasing
            if(this.drugs[index].name==="Fervex"&&this.drugs[index].expiresIn>10){
            this.drugs[index].benefit=this.drugs[index].benefit + 1 < 50 ? this.drugs[index].benefit+1 :50
            }else{
              //if it's Fervex and it's expiring in 10 days or less
              if(this.drugs[index].name==="Fervex"&& this.drugs[index].expiresIn<=10&& this.drugs[index].expiresIn>=5){
            this.drugs[index].benefit=this.drugs[index].benefit + 2 < 50 ? this.drugs[index].benefit+2 :50
              }else{

            //if it's Dafalgan then it decreases twice as fast as normal drugs
            if(this.drugs[index].name==="Dafalgan"){

            this.drugs[index].benefit=this.drugs[index].benefit - 2 >= 0 ? this.drugs[index].benefit-2 :0
            }else{
              //if it's not Fervex nor Dafalgan then everything happens normally
            this.drugs[index].benefit=this.drugs[index].benefit + 1 < 50 ? this.drugs[index].benefit+1 :50
                }
                
              }
            }
          }
        }
        this.drugs[index].expiresIn=this.drugs[index].expiresIn-1
      }else{
        //decrease the expiredIn value of Magic Pill
        this.drugs[index].expiresIn-=1
      }
    }
    return this.drugs
  }
}
