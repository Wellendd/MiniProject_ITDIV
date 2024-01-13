namespace ITDIV.Models.Results
{
    public class ApiResponseCat<T>
    {

        public int StatusCode { get; set; }
        public string RequestMethod { get; set; }
        public T Data { get; set; }
        public List<T> Payload { get; set; }
    }
}
